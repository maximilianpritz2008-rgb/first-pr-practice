"""Mini-JARVIS – ein persönlicher KI-Assistent mit Claude.

Start:
    python jarvis.py           # Textmodus (tippen)
    python jarvis.py --voice   # Sprachmodus (Mikrofon + Lautsprecher)
"""

import sys

import anthropic

from tools import TOOLS, run_tool

MODEL = "claude-opus-5-5"

SYSTEM_PROMPT = """Du bist JARVIS, der persönliche KI-Assistent des Nutzers – \
inspiriert von Tony Starks Assistent aus Iron Man.
Du sprichst Deutsch, bist höflich, ein wenig trocken-humorvoll und nennst den Nutzer "Sir".
Halte deine Antworten kurz (1–3 Sätze), weil sie eventuell vorgelesen werden.
Benutze deine Werkzeuge, wenn sie bei der Anfrage helfen."""

client = anthropic.Anthropic()  # liest den Schlüssel aus ANTHROPIC_API_KEY


def ask_jarvis(messages: list) -> str:
    """Schickt das Gespräch an Claude, führt Werkzeuge aus und gibt die Antwort zurück."""
    while True:
        response = client.beta.messages.create(
            model=MODEL,
            max_tokens=16000,
            system=SYSTEM_PROMPT,
            tools=TOOLS,
            messages=messages,
            output_config={"effort": "low"},  # schnelle Antworten für Chat
            # Falls Claude eine Anfrage ablehnt, automatisch ein anderes Modell probieren
            betas=["server-side-fallback-2026-07-01"],
            fallbacks="default",
        )
        # Die komplette Antwort ans Gespräch anhängen (nicht nur den Text)
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "refusal":
            return "Das kann ich leider nicht tun, Sir."

        if response.stop_reason != "tool_use":
            text = "".join(b.text for b in response.content if b.type == "text")
            return text or "..."

        # Claude möchte Werkzeuge benutzen -> alle ausführen, Ergebnisse gesammelt zurückschicken
        results = []
        for block in response.content:
            if block.type == "tool_use":
                print(f"   ⚙️  {block.name}({block.input})")
                output, is_error = run_tool(block.name, block.input)
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": output,
                    "is_error": is_error,
                })
        messages.append({"role": "user", "content": results})


def main() -> None:
    voice_mode = "--voice" in sys.argv
    if voice_mode:
        from voice import listen, speak

    messages = []  # das Gedächtnis von JARVIS für diese Sitzung
    print("🤖 JARVIS ist online. ('exit' zum Beenden)\n")

    while True:
        if voice_mode:
            user_input = listen()
            if not user_input:
                continue
            print(f"Du: {user_input}")
        else:
            user_input = input("Du: ").strip()
            if not user_input:
                continue

        if user_input.lower() in ("exit", "quit", "tschüss", "beenden"):
            print("JARVIS: Bis später, Sir.")
            break

        start = len(messages)
        messages.append({"role": "user", "content": user_input})
        try:
            answer = ask_jarvis(messages)
        except anthropic.AuthenticationError:
            print("❌ Ungültiger API-Schlüssel. Ist ANTHROPIC_API_KEY richtig gesetzt?")
            break
        except anthropic.RateLimitError:
            print("⏳ Zu viele Anfragen – kurz warten und nochmal versuchen.")
            del messages[start:]  # fehlgeschlagene Runde aus dem Gedächtnis entfernen
            continue
        except anthropic.APIConnectionError:
            print("🌐 Keine Verbindung zur API. Internet prüfen.")
            del messages[start:]  # fehlgeschlagene Runde aus dem Gedächtnis entfernen
            continue

        print(f"JARVIS: {answer}\n")
        if voice_mode:
            speak(answer)


if __name__ == "__main__":
    main()

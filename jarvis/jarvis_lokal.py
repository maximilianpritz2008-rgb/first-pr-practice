"""Mini-JARVIS (lokal) – läuft komplett kostenlos auf deinem PC mit Ollama.

Vorher einmalig:
    1. Ollama installieren: https://ollama.com/download
    2. Modell herunterladen:  ollama pull qwen2.5:7b
    3. pip install ollama

Start:
    python jarvis_lokal.py           # Textmodus (tippen)
    python jarvis_lokal.py --voice   # Sprachmodus (Mikrofon + Lautsprecher)
"""

import os
import sys

import ollama

from tools import TOOLS, run_tool

# Anderes Modell? z. B.:  set JARVIS_MODEL=llama3.1:8b  (Windows)
#                         export JARVIS_MODEL=llama3.1:8b  (Mac/Linux)
MODEL = os.environ.get("JARVIS_MODEL", "qwen2.5:7b")

SYSTEM_PROMPT = """Du bist JARVIS, der persönliche KI-Assistent des Nutzers – \
inspiriert von Tony Starks Assistent aus Iron Man.
Antworte immer auf Deutsch, höflich und ein wenig trocken-humorvoll, und nenne den Nutzer "Sir".
Halte deine Antworten kurz (1–3 Sätze), weil sie eventuell vorgelesen werden.
Benutze deine Werkzeuge nur, wenn sie wirklich bei der Anfrage helfen."""

# Ollama erwartet die Werkzeuge in einem etwas anderen Format als Claude
OLLAMA_TOOLS = [
    {
        "type": "function",
        "function": {
            "name": t["name"],
            "description": t["description"],
            "parameters": t["input_schema"],
        },
    }
    for t in TOOLS
]


def ask_jarvis(messages: list) -> str:
    """Schickt das Gespräch an das lokale Modell, führt Werkzeuge aus und gibt die Antwort zurück."""
    for _ in range(5):  # höchstens 5 Werkzeug-Runden, damit er sich nicht im Kreis dreht
        response = ollama.chat(model=MODEL, messages=messages, tools=OLLAMA_TOOLS)
        msg = response.message
        messages.append(msg)

        if not msg.tool_calls:
            return msg.content or "..."

        for call in msg.tool_calls:
            name, args = call.function.name, dict(call.function.arguments or {})
            print(f"   ⚙️  {name}({args})")
            output, _ = run_tool(name, args)
            messages.append({"role": "tool", "content": output, "tool_name": name})

    return "Entschuldigung, Sir, da habe ich mich verheddert."


def main() -> None:
    voice_mode = "--voice" in sys.argv
    if voice_mode:
        from voice import listen, speak

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    print(f"🤖 JARVIS ist online (lokal, Modell: {MODEL}). ('exit' zum Beenden)\n")

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
        except ConnectionError:
            print("❌ Ollama läuft nicht. Starte die Ollama-App (oder 'ollama serve') und versuch es nochmal.")
            del messages[start:]
            continue
        except ollama.ResponseError as e:
            if e.status_code == 404:
                print(f"❌ Modell '{MODEL}' fehlt. Lade es mit:  ollama pull {MODEL}")
                break
            print(f"❌ Fehler von Ollama: {e.error}")
            del messages[start:]
            continue

        print(f"JARVIS: {answer}\n")
        if voice_mode:
            speak(answer)


if __name__ == "__main__":
    main()

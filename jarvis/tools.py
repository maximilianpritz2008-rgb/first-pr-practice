"""Die Werkzeuge, die JARVIS benutzen darf.

Jedes Werkzeug besteht aus zwei Teilen:
  1. einer Beschreibung (TOOLS), damit Claude weiß, was es gibt und welche Eingaben nötig sind
  2. einer Python-Funktion, die das Werkzeug wirklich ausführt

Neues Werkzeug hinzufügen = Funktion schreiben + Eintrag in TOOLS + Eintrag in HANDLERS.
"""

import json
import urllib.parse
import urllib.request
import webbrowser
from datetime import datetime
from pathlib import Path

NOTES_FILE = Path(__file__).parent / "notizen.txt"


def get_time() -> str:
    return datetime.now().strftime("Es ist %H:%M Uhr am %d.%m.%Y.")


def get_weather(city: str) -> str:
    # wttr.in ist ein kostenloser Wetterdienst ohne API-Schlüssel
    url = f"https://wttr.in/{urllib.parse.quote(city)}?format=j1&lang=de"
    with urllib.request.urlopen(url, timeout=10) as resp:
        data = json.load(resp)
    now = data["current_condition"][0]
    desc = now.get("lang_de", now["weatherDesc"])[0]["value"]
    return f"{city}: {now['temp_C']} °C, gefühlt {now['FeelsLikeC']} °C, {desc}"


def open_website(url: str) -> str:
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
    webbrowser.open(url)
    return f"Habe {url} im Browser geöffnet."


def take_note(text: str) -> str:
    with NOTES_FILE.open("a", encoding="utf-8") as f:
        f.write(f"[{datetime.now():%d.%m.%Y %H:%M}] {text}\n")
    return "Notiz gespeichert."


def read_notes() -> str:
    if not NOTES_FILE.exists():
        return "Es gibt noch keine Notizen."
    return NOTES_FILE.read_text(encoding="utf-8")


TOOLS = [
    {
        "name": "get_time",
        "description": "Gibt das aktuelle Datum und die Uhrzeit zurück.",
        "input_schema": {"type": "object", "properties": {}, "additionalProperties": False},
    },
    {
        "name": "get_weather",
        "description": "Holt das aktuelle Wetter für eine Stadt.",
        "input_schema": {
            "type": "object",
            "properties": {"city": {"type": "string", "description": "Name der Stadt, z. B. Berlin"}},
            "required": ["city"],
            "additionalProperties": False,
        },
    },
    {
        "name": "open_website",
        "description": "Öffnet eine Webseite im Standardbrowser des Nutzers.",
        "input_schema": {
            "type": "object",
            "properties": {"url": {"type": "string", "description": "Adresse, z. B. youtube.com"}},
            "required": ["url"],
            "additionalProperties": False,
        },
    },
    {
        "name": "take_note",
        "description": "Speichert eine Notiz für den Nutzer.",
        "input_schema": {
            "type": "object",
            "properties": {"text": {"type": "string", "description": "Inhalt der Notiz"}},
            "required": ["text"],
            "additionalProperties": False,
        },
    },
    {
        "name": "read_notes",
        "description": "Liest alle gespeicherten Notizen vor.",
        "input_schema": {"type": "object", "properties": {}, "additionalProperties": False},
    },
]

HANDLERS = {
    "get_time": get_time,
    "get_weather": get_weather,
    "open_website": open_website,
    "take_note": take_note,
    "read_notes": read_notes,
}


def run_tool(name: str, args: dict) -> tuple[str, bool]:
    """Führt ein Werkzeug aus. Gibt (Ergebnis, ist_fehler) zurück."""
    handler = HANDLERS.get(name)
    if handler is None:
        return f"Unbekanntes Werkzeug: {name}", True
    try:
        return handler(**args), False
    except Exception as e:  # Fehler an Claude zurückgeben statt abzustürzen
        return f"Fehler bei {name}: {e}", True

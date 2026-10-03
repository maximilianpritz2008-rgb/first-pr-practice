# 🤖 Mini-JARVIS

Ein kleiner persönlicher KI-Assistent im Stil von JARVIS aus Iron Man – gebaut mit Python und Claude.

## Was kann er?

- Mit dir auf Deutsch quatschen (mit Gedächtnis während der Sitzung)
- 🕐 Uhrzeit und Datum sagen
- 🌤️ Das Wetter für eine Stadt abfragen
- 🌐 Webseiten öffnen („Öffne YouTube“)
- 📝 Notizen speichern und vorlesen
- 🎙️ Optional: Sprachsteuerung per Mikrofon und Antworten per Lautsprecher

## Einrichten

1. **Python 3.10+** installieren.
2. Abhängigkeiten installieren:
   ```bash
   cd jarvis
   pip install anthropic
   # nur für den Sprachmodus zusätzlich:
   pip install SpeechRecognition pyaudio pyttsx3
   ```
3. **API-Schlüssel** auf <https://console.anthropic.com> erstellen und setzen:
   ```bash
   # Mac/Linux
   export ANTHROPIC_API_KEY="dein-schlüssel"
   # Windows (PowerShell)
   $env:ANTHROPIC_API_KEY="dein-schlüssel"
   ```
   ⚠️ Den Schlüssel niemals in den Code schreiben oder auf GitHub hochladen!
   Die API kostet pro Anfrage ein paar Cent, also behalte dein Guthaben im Blick.

## Starten

```bash
python jarvis.py           # Textmodus: du tippst
python jarvis.py --voice   # Sprachmodus: du sprichst
```

Beenden mit `exit` oder „tschüss“.

## Wie funktioniert das?

| Datei        | Aufgabe |
|--------------|---------|
| `jarvis.py`  | Das Herz: schickt das Gespräch an Claude und führt Werkzeuge aus |
| `tools.py`   | Die Werkzeuge (Uhrzeit, Wetter, Webseiten, Notizen) |
| `voice.py`   | Spracherkennung und Sprachausgabe (optional) |

Der Ablauf:

1. Du sagst etwas → es landet in der Liste `messages` (das Gedächtnis).
2. Claude antwortet entweder direkt **oder** sagt „ich möchte Werkzeug X benutzen“.
3. Im zweiten Fall führt `jarvis.py` das Werkzeug aus und schickt das Ergebnis zurück.
4. Das wiederholt sich, bis Claude eine fertige Antwort hat.

## Eigene Werkzeuge hinzufügen

In `tools.py`:

1. Eine Funktion schreiben, z. B. `def wuerfeln() -> str: ...`
2. Eine Beschreibung in die Liste `TOOLS` eintragen
3. Die Funktion in `HANDLERS` eintragen

Fertig, Claude entscheidet dann selbst, wann es das Werkzeug benutzt.

## Ideen zum Weiterbauen

- Ein Weckwort („Hey Jarvis“) mit [openWakeWord](https://github.com/dscripka/openWakeWord)
- Smart Home steuern über [Home Assistant](https://www.home-assistant.io/)
- Eine schönere Stimme, z. B. mit ElevenLabs
- Eine Oberfläche im Iron-Man-Look (z. B. mit `tkinter` oder als Webseite)

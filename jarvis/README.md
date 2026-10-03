# 🤖 Mini-JARVIS

Ein kleiner persönlicher KI-Assistent im Stil von JARVIS aus Iron Man – gebaut mit Python und Claude.

## Was kann er?

- Mit dir auf Deutsch quatschen (mit Gedächtnis während der Sitzung)
- 🕐 Uhrzeit und Datum sagen
- 🌤️ Das Wetter für eine Stadt abfragen
- 🌐 Webseiten öffnen („Öffne YouTube“)
- 📝 Notizen speichern und vorlesen
- 🎙️ Optional: Sprachsteuerung per Mikrofon und Antworten per Lautsprecher

## 🆓 Kostenlos lokal mit Ollama (empfohlen zum Ausprobieren)

Hier läuft die KI direkt auf deinem PC: kein Konto, kein API-Schlüssel, keine Kosten.

1. **Ollama installieren:** <https://ollama.com/download> (Windows oder Mac) und die App starten.
2. **Ein Modell herunterladen** (einmalig, ca. 4–5 GB). Im Terminal bzw. in der PowerShell:
   ```bash
   ollama pull qwen2.5:7b
   ```
3. **Python-Paket installieren:**
   ```bash
   cd jarvis
   pip install ollama
   ```
4. **Starten:**
   ```bash
   python jarvis_lokal.py
   ```

**Tipps:**
- Antwortet er sehr langsam, ist dein PC zu schwach für das Modell. Probier ein kleineres:
  `ollama pull qwen2.5:3b` und dann vor dem Start `set JARVIS_MODEL=qwen2.5:3b` (Windows)
  bzw. `export JARVIS_MODEL=qwen2.5:3b` (Mac).
- Lokale Modelle sind etwas weniger schlau als Claude und benutzen Werkzeuge manchmal falsch, das ist normal.
- Der Sprachmodus funktioniert genauso: `python jarvis_lokal.py --voice`

## Mit Claude über die API (kostet ein paar Cent pro Frage)

### Einrichten

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

### Starten

```bash
python jarvis.py           # Textmodus: du tippst
python jarvis.py --voice   # Sprachmodus: du sprichst
```

Beenden mit `exit` oder „tschüss“.

## Wie funktioniert das?

| Datei        | Aufgabe |
|--------------|---------|
| `jarvis.py`  | Version mit Claude: schickt das Gespräch an Claude und führt Werkzeuge aus |
| `jarvis_lokal.py` | Kostenlose Version mit Ollama (läuft auf deinem PC) |
| `tools.py`   | Die Werkzeuge (Uhrzeit, Wetter, Webseiten, Notizen) |
| `voice.py`   | Spracherkennung und Sprachausgabe (optional) |

Der Ablauf:

1. Du sagst etwas → es landet in der Liste `messages` (das Gedächtnis).
2. Die KI antwortet entweder direkt **oder** sagt „ich möchte Werkzeug X benutzen“.
3. Im zweiten Fall führt `jarvis.py` das Werkzeug aus und schickt das Ergebnis zurück.
4. Das wiederholt sich, bis die KI eine fertige Antwort hat.

## Eigene Werkzeuge hinzufügen

In `tools.py`:

1. Eine Funktion schreiben, z. B. `def wuerfeln() -> str: ...`
2. Eine Beschreibung in die Liste `TOOLS` eintragen
3. Die Funktion in `HANDLERS` eintragen

Fertig, die KI entscheidet dann selbst, wann es das Werkzeug benutzt.

## Ideen zum Weiterbauen

- Ein Weckwort („Hey Jarvis“) mit [openWakeWord](https://github.com/dscripka/openWakeWord)
- Smart Home steuern über [Home Assistant](https://www.home-assistant.io/)
- Eine schönere Stimme, z. B. mit ElevenLabs
- Eine Oberfläche im Iron-Man-Look (z. B. mit `tkinter` oder als Webseite)

"""Optionaler Sprachmodus: Mikrofon -> Text und Text -> Sprache.

Die Bibliotheken werden erst hier importiert, damit der Textmodus
auch ohne sie funktioniert.
"""

import pyttsx3
import speech_recognition as sr

_recognizer = sr.Recognizer()
_recognizer.pause_threshold = 1.0  # so lange Stille, bis der Satz als fertig gilt (Sekunden)


def _german_voice(engine) -> str | None:
    """Sucht eine deutsche Stimme (unter Windows meist 'Microsoft Hedda' oder 'Katja')."""
    for voice in engine.getProperty("voices"):
        text = f"{voice.id} {voice.name}".lower()
        if "german" in text or "deutsch" in text or "de-de" in text or "de_de" in text:
            return voice.id
    return None


def listen() -> str | None:
    """Hört einen Satz über das Mikrofon und gibt ihn als Text zurück."""
    with sr.Microphone() as source:
        _recognizer.adjust_for_ambient_noise(source, duration=0.5)
        print("   [Ich höre zu ... sprich jetzt]")
        try:
            audio = _recognizer.listen(source, timeout=10, phrase_time_limit=15)
        except sr.WaitTimeoutError:
            return None  # niemand hat etwas gesagt -> einfach weiter zuhören
    try:
        # Nutzt die kostenlose Google-Spracherkennung (braucht Internet)
        return _recognizer.recognize_google(audio, language="de-DE")
    except sr.UnknownValueError:
        print("   (nicht verstanden, bitte nochmal)")
        return None
    except sr.RequestError:
        print("   (Spracherkennung nicht erreichbar - Internet prüfen)")
        return None


def speak(text: str) -> None:
    """Liest Text laut vor (offline, mit der Systemstimme)."""
    # Jedes Mal neu starten: unter Windows bleibt pyttsx3 sonst manchmal nach dem ersten Satz stumm
    engine = pyttsx3.init()
    voice_id = _german_voice(engine)
    if voice_id:
        engine.setProperty("voice", voice_id)
    engine.setProperty("rate", 175)
    engine.say(text)
    engine.runAndWait()
    engine.stop()

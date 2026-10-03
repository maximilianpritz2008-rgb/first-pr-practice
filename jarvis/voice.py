"""Optionaler Sprachmodus: Mikrofon -> Text und Text -> Sprache.

Die Bibliotheken werden erst hier importiert, damit der Textmodus
auch ohne sie funktioniert.
"""

import speech_recognition as sr
import pyttsx3

_recognizer = sr.Recognizer()
_engine = pyttsx3.init()


def listen() -> str | None:
    """Hört einen Satz über das Mikrofon und gibt ihn als Text zurück."""
    with sr.Microphone() as source:
        _recognizer.adjust_for_ambient_noise(source, duration=0.5)
        print("🎙️  Ich höre zu ...")
        audio = _recognizer.listen(source, phrase_time_limit=10)
    try:
        # Nutzt die kostenlose Google-Spracherkennung (braucht Internet)
        return _recognizer.recognize_google(audio, language="de-DE")
    except sr.UnknownValueError:
        return None


def speak(text: str) -> None:
    """Liest Text laut vor (offline, mit der Systemstimme)."""
    _engine.say(text)
    _engine.runAndWait()

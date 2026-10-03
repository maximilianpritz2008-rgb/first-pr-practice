#!/bin/bash
# Mini-JARVIS – Einrichtung und Start für Mac (Doppelklick oder: bash start_mac.command)
cd "$(dirname "$0")"
MODEL="${JARVIS_MODEL:-qwen2.5:7b}"

echo "============================================"
echo "  Mini-JARVIS – Einrichtung und Start"
echo "============================================"
echo

# ---- 1. Python prüfen ----
echo "[1/4] Prüfe Python ..."
if ! python3 -c "import sys; assert sys.version_info >= (3, 10)" 2>/dev/null; then
    echo "  Python 3.10+ fehlt. Ich öffne die Download-Seite."
    echo "  Bitte installieren und dieses Skript danach nochmal starten."
    open "https://www.python.org/downloads/"
    read -p "Enter zum Beenden ..."; exit 1
fi
python3 --version; echo "  OK"

# ---- 2. Ollama prüfen ----
echo "[2/4] Prüfe Ollama ..."
if ! command -v ollama >/dev/null 2>&1; then
    if [ -x "/Applications/Ollama.app/Contents/Resources/ollama" ]; then
        export PATH="/Applications/Ollama.app/Contents/Resources:$PATH"
    elif command -v brew >/dev/null 2>&1; then
        echo "  Ollama fehlt – wird mit Homebrew installiert ..."
        brew install ollama || { read -p "Installation fehlgeschlagen. Enter ..."; exit 1; }
    else
        echo "  Ollama fehlt. Ich öffne die Download-Seite."
        echo "  Bitte installieren, einmal öffnen und dieses Skript danach nochmal starten."
        open "https://ollama.com/download"
        read -p "Enter zum Beenden ..."; exit 1
    fi
fi
echo "  OK"

# ---- 3. Ollama starten und Modell laden ----
echo "[3/4] Prüfe KI-Modell $MODEL ..."
if ! ollama list >/dev/null 2>&1; then
    echo "  Starte Ollama ..."
    open -a Ollama 2>/dev/null || (ollama serve >/dev/null 2>&1 &)
    for i in $(seq 1 15); do ollama list >/dev/null 2>&1 && break; sleep 1; done
fi
if ! ollama list | grep -q "$MODEL"; then
    echo "  Modell wird heruntergeladen (einmalig, ca. 4-5 GB, kann dauern) ..."
    ollama pull "$MODEL" || { read -p "Download fehlgeschlagen. Enter ..."; exit 1; }
fi
echo "  OK"

# ---- 4. Python-Umgebung und Start ----
echo "[4/4] Prüfe Python-Pakete ..."
[ -x .venv/bin/python ] || python3 -m venv .venv
.venv/bin/python -m pip install -q --disable-pip-version-check ollama
if [ "$1" == "--voice" ]; then
    echo "  Installiere Pakete für die Sprachsteuerung ..."
    .venv/bin/python -m pip install -q --disable-pip-version-check SpeechRecognition pyaudio pyttsx3
fi
echo "  OK"; echo

.venv/bin/python jarvis_lokal.py "$@"

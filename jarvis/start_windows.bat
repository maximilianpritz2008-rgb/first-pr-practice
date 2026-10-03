@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
set MODEL=qwen2.5:7b
if defined JARVIS_MODEL set MODEL=%JARVIS_MODEL%

echo ============================================
echo   Mini-JARVIS - Einrichtung und Start
echo ============================================
echo.

rem ---- 1. Python pruefen ----
echo [1/4] Pruefe Python ...
python --version >nul 2>&1
if errorlevel 1 (
    echo   Python fehlt - wird installiert ...
    winget install -e --id Python.Python.3.12 --accept-package-agreements --accept-source-agreements
    echo.
    echo   Python wurde installiert. Bitte dieses Fenster schliessen
    echo   und start_windows.bat noch einmal doppelklicken.
    pause
    exit /b
)
python --version
echo   OK

rem ---- 2. Ollama pruefen ----
echo [2/4] Pruefe Ollama ...
set "OLLAMA=ollama"
where ollama >nul 2>&1
if errorlevel 1 (
    if exist "%LOCALAPPDATA%\Programs\Ollama\ollama.exe" (
        set "OLLAMA=%LOCALAPPDATA%\Programs\Ollama\ollama.exe"
    ) else (
        echo   Ollama fehlt - wird installiert ...
        winget install -e --id Ollama.Ollama --accept-package-agreements --accept-source-agreements
        echo.
        echo   Ollama wurde installiert. Bitte dieses Fenster schliessen
        echo   und start_windows.bat noch einmal doppelklicken.
        pause
        exit /b
    )
)
echo   OK

rem ---- 3. Ollama starten und Modell laden ----
echo [3/4] Pruefe KI-Modell %MODEL% ...
"%OLLAMA%" list >nul 2>&1
if errorlevel 1 (
    echo   Starte Ollama im Hintergrund ...
    start "" /min "%OLLAMA%" serve
    timeout /t 5 /nobreak >nul
)
"%OLLAMA%" list | findstr /c:"%MODEL%" >nul
if errorlevel 1 (
    echo   Modell wird heruntergeladen (einmalig, ca. 4-5 GB, kann dauern^) ...
    "%OLLAMA%" pull %MODEL%
    if errorlevel 1 (
        echo   Download fehlgeschlagen. Internet pruefen und nochmal starten.
        pause
        exit /b
    )
)
echo   OK

rem ---- 4. Python-Umgebung und Start ----
echo [4/4] Pruefe Python-Pakete ...
if not exist ".venv\Scripts\python.exe" python -m venv .venv
".venv\Scripts\python.exe" -m pip install -q --disable-pip-version-check ollama
if "%~1"=="--voice" (
    echo   Installiere Pakete fuer die Sprachsteuerung ...
    ".venv\Scripts\python.exe" -m pip install -q --disable-pip-version-check SpeechRecognition pyaudio pyttsx3
)
echo   OK
echo.

".venv\Scripts\python.exe" jarvis_lokal.py %*
pause

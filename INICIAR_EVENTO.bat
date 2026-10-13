@echo off
cd /d %~dp0
if not exist node_modules (
  echo Instalando dependencias...
  call npm install
)
echo Compilando proyecto local...
call npm run build
if errorlevel 1 (
  echo No se pudo compilar el proyecto.
  pause
  exit /b 1
)

echo Iniciando EnRuta Trivia local...
start "EnRuta Server" cmd /k "cd /d %~dp0 && npm start"
timeout /t 5 /nobreak >nul

set "CHROME_EXE=chrome"
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
set "CHROME_PROFILE=%LOCALAPPDATA%\EnRutaTriviaChrome"
set "CHROME_FLAGS=--user-data-dir=%CHROME_PROFILE% --autoplay-policy=no-user-gesture-required --disable-features=PreloadMediaEngagementData,MediaEngagementBypassAutoplayPolicies"

start "EnRuta Touch" "%CHROME_EXE%" %CHROME_FLAGS% --new-window http://localhost:3001/touch
timeout /t 1 /nobreak >nul
start "EnRuta Video" "%CHROME_EXE%" %CHROME_FLAGS% --new-window http://localhost:3001/video
timeout /t 1 /nobreak >nul
start "EnRuta Content" "%CHROME_EXE%" %CHROME_FLAGS% --new-window http://localhost:3001/content

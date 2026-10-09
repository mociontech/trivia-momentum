@echo off
cd /d %~dp0
if not exist node_modules (
  echo Instalando dependencias...
  call npm install
)
if not exist dist (
  echo Compilando proyecto...
  call npm run build
)
echo Iniciando EnRuta Trivia...
start "EnRuta Server" cmd /k npm start
timeout /t 3 /nobreak >nul
start chrome --new-window http://localhost:3001/touch
start chrome --new-window http://localhost:3001/video
start chrome --new-window http://localhost:3001/content

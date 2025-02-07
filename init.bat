@echo off
echo Instalando dependencias...
npm i
if %errorlevel% neq 0 (
    echo Error al instalar las dependencias.
    pause
    exit /b %errorlevel%
)

echo Iniciando el servidor de desarrollo...
npm run dev
if %errorlevel% neq 0 (
    echo Error al iniciar el servidor de desarrollo.
    pause
    exit /b %errorlevel%
)

pause
Write-Host "Instalando dependencias..."
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al instalar las dependencias."
    Pause
    exit $LASTEXITCODE
}

Write-Host "Iniciando el servidor de desarrollo..."
npm run dev

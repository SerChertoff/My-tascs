# Очистка кэша и запуск dev-сервера Task Sync
Set-Location $PSScriptRoot

if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
    Write-Host "Папка .next удалена." -ForegroundColor Green
}

Write-Host "Запуск npm run dev..." -ForegroundColor Cyan
npm run dev

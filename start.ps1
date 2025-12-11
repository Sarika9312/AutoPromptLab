# AutoPromptLab Start Script
# Quick start for development

Write-Host "🚀 Starting AutoPromptLab..." -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Run setup.ps1 first to set up the project" -ForegroundColor Yellow
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path node_modules)) {
    Write-Host "❌ Dependencies not installed!" -ForegroundColor Red
    Write-Host "Run setup.ps1 first to install dependencies" -ForegroundColor Yellow
    exit 1
}

Write-Host "Starting both frontend and backend..." -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

npm run dev

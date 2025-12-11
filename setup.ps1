# AutoPromptLab Setup Script
# Run this script to set up the entire project

Write-Host "🚀 AutoPromptLab Setup Script" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js version
Write-Host "Checking Node.js version..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($nodeVersion) {
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install Node.js >= 18.0.0" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
$npmVersion = npm --version
if ($npmVersion) {
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing Dependencies..." -ForegroundColor Cyan
Write-Host ""

# Install root dependencies
Write-Host "Installing root dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Root dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install root dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "🔧 Setting up environment..." -ForegroundColor Cyan

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ .env file created" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Edit .env file and add your API keys!" -ForegroundColor Red
    Write-Host "   Required keys:" -ForegroundColor Yellow
    Write-Host "   - OPENAI_API_KEY" -ForegroundColor Yellow
    Write-Host "   - GEMINI_API_KEY" -ForegroundColor Yellow
    Write-Host "   - ANTHROPIC_API_KEY" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env file and add your API keys" -ForegroundColor White
Write-Host "2. Start MongoDB (mongod or MongoDB Atlas)" -ForegroundColor White
Write-Host "3. Run: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Access the app at:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "   - README.md - Complete documentation" -ForegroundColor White
Write-Host "   - INSTALLATION.md - Detailed setup guide" -ForegroundColor White
Write-Host "   - PROJECT_SUMMARY.md - Project overview" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🎉" -ForegroundColor Green

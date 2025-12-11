# 🚀 Quick Start Guide - AutoPromptLab

## Step-by-Step Installation

### 1. Install Dependencies

**From the project root directory:**

```powershell
# Install root dependencies (for concurrent running)
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Setup Environment Variables

```powershell
# Copy the example environment file
Copy-Item .env.example .env

# Edit the .env file and add your API keys
notepad .env
```

**Required API Keys:**
- OpenAI: https://platform.openai.com/api-keys
- Google Gemini: https://makersuite.google.com/app/apikey
- Anthropic: https://console.anthropic.com/

### 3. Start MongoDB

**Option A: Local MongoDB**
```powershell
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Run the Application

**Option A: Run both servers concurrently (Recommended)**
```powershell
npm run dev
```

**Option B: Run separately**

Terminal 1 - Backend:
```powershell
cd backend
node server.js
```

Terminal 2 - Frontend:
```powershell
cd frontend
npm run dev
```

### 5. Access the Application

Open your browser and go to:
```
http://localhost:5173
```

Backend API is available at:
```
http://localhost:5000
```

## Troubleshooting

### MongoDB Connection Issues
```powershell
# Check if MongoDB is running
Get-Process mongod

# Or use MongoDB Compass to verify connection
```

### Port Already in Use
```powershell
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process if needed
taskkill /PID <PID> /F
```

### Module Not Found Errors
```powershell
# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force backend/node_modules
Remove-Item -Recurse -Force frontend/node_modules

npm install
cd backend; npm install; cd ..
cd frontend; npm install; cd ..
```

### API Key Issues
- Ensure all three API keys are set in `.env`
- Check that keys don't have extra spaces
- Verify keys are valid by testing them in the respective platforms

## Testing the Features

### 1. Test Prompt Tester
1. Navigate to "Prompt Tester"
2. Enter: "Explain machine learning in simple terms"
3. Click "Test Prompt"
4. View responses from all three models

### 2. Test RAG Uploader
1. Navigate to "RAG Uploader"
2. Drag and drop a PDF file
3. Wait for processing
4. Enter a query: "What is this document about?"
5. Click "Search"

### 3. Test Benchmark Dashboard
1. Navigate to "Benchmark"
2. View model comparison charts
3. (Note: You need to test prompts first to populate data)

### 4. Test Workflow Generator
1. Navigate to "Workflow"
2. Enter: "Create a content marketing workflow"
3. Click "Generate Workflow"
4. View the generated steps and documentation

## Development Tips

### Hot Reload
- Frontend: Automatically reloads on file changes
- Backend: Restart required (or use `nodemon`)

### Viewing Logs
```powershell
# Backend logs show in the terminal
# Check for errors in backend console

# Frontend logs show in browser console (F12)
```

### Database Inspection
Use MongoDB Compass to view:
```
mongodb://localhost:27017/autopromptlab
```

Collections:
- `documents` - Uploaded PDFs
- `prompttests` - Test results
- `benchmarks` - Model metrics

## Next Steps

1. ✅ Verify all features work
2. 📝 Customize the UI (colors, branding)
3. 🔐 Add authentication (optional)
4. 🌐 Deploy to production
5. 📊 Monitor API usage and costs

## Need Help?

- Check the main README.md for detailed documentation
- Review API endpoints in the "API Documentation" section
- Check error logs in the terminal/console
- Ensure all dependencies are installed correctly

---

**Happy Building! 🎉**

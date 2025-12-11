# ✅ AutoPromptLab - Setup Checklist

## Pre-Installation Checklist

### System Requirements
- [ ] Node.js >= 18.0.0 installed
- [ ] npm package manager available
- [ ] MongoDB installed (local) OR MongoDB Atlas account created
- [ ] PowerShell terminal access

### API Keys Required
- [ ] OpenAI API Key (https://platform.openai.com/api-keys)
- [ ] Google Gemini API Key (https://makersuite.google.com/app/apikey)
- [ ] Anthropic API Key (https://console.anthropic.com/)

## Installation Steps

### Step 1: Project Setup
- [ ] Navigate to project directory
- [ ] Run `.\setup.ps1` in PowerShell
- [ ] Wait for all dependencies to install

### Step 2: Configuration
- [ ] Open `.env` file
- [ ] Add OPENAI_API_KEY
- [ ] Add GEMINI_API_KEY
- [ ] Add ANTHROPIC_API_KEY
- [ ] Verify MONGODB_URI is correct
- [ ] Save `.env` file

### Step 3: Database
- [ ] Start MongoDB locally (`mongod`) OR
- [ ] Connect to MongoDB Atlas
- [ ] Verify connection URL in `.env`

### Step 4: First Run
- [ ] Run `.\start.ps1` OR `npm run dev`
- [ ] Wait for both servers to start
- [ ] Check for any errors in terminal

### Step 5: Verification
- [ ] Open http://localhost:5173 in browser
- [ ] Verify homepage loads correctly
- [ ] Check that all navigation links work
- [ ] No console errors in browser (F12)

## Feature Testing Checklist

### Test 1: Prompt Tester
- [ ] Navigate to "Prompt Tester"
- [ ] Enter test prompt: "Explain quantum computing"
- [ ] Click "Test Prompt"
- [ ] Wait for responses from all three models
- [ ] Verify scores are displayed
- [ ] Check radar chart appears
- [ ] Test copy to clipboard feature

### Test 2: RAG Uploader
- [ ] Navigate to "RAG Uploader"
- [ ] Prepare a test PDF file
- [ ] Drag and drop PDF onto upload area
- [ ] Wait for processing to complete
- [ ] Verify document appears in sidebar
- [ ] Enter query: "What is this document about?"
- [ ] Click "Search"
- [ ] Verify answer appears with sources
- [ ] Check citations are highlighted

### Test 3: Benchmark Dashboard
- [ ] Navigate to "Benchmark"
- [ ] Verify model comparison cards appear
- [ ] Check all charts are visible
- [ ] Verify metrics are displayed
- [ ] Note: Run some prompt tests first for data

### Test 4: Workflow Generator
- [ ] Navigate to "Workflow"
- [ ] Try a template from sidebar
- [ ] Click "Generate Workflow"
- [ ] Wait for workflow generation
- [ ] Verify steps are displayed
- [ ] Test copy documentation feature
- [ ] Test download documentation feature

### Test 5: UI/UX
- [ ] Test all navigation links
- [ ] Verify responsive design on different screen sizes
- [ ] Check animations are smooth
- [ ] Test all buttons and interactions
- [ ] Verify loading states appear correctly
- [ ] Check error messages display properly

## Troubleshooting Checklist

### If Frontend Won't Start
- [ ] Check port 5173 is available
- [ ] Verify frontend dependencies installed (`cd frontend && npm install`)
- [ ] Check for errors in terminal
- [ ] Try clearing cache: `rm -rf frontend/node_modules && cd frontend && npm install`

### If Backend Won't Start
- [ ] Check port 5000 is available
- [ ] Verify backend dependencies installed (`cd backend && npm install`)
- [ ] Check MongoDB is running
- [ ] Verify `.env` file exists and has all keys
- [ ] Check for typos in API keys

### If API Calls Fail
- [ ] Verify all three API keys are set in `.env`
- [ ] Check API keys don't have extra spaces
- [ ] Test API keys in respective platforms
- [ ] Check internet connection
- [ ] Verify CORS settings

### If MongoDB Connection Fails
- [ ] Check MongoDB service is running (`Get-Service MongoDB` or `mongod`)
- [ ] Verify connection string in `.env`
- [ ] Check MongoDB Atlas whitelist (if using Atlas)
- [ ] Try MongoDB Compass to test connection
- [ ] Check firewall settings

### If PDF Upload Fails
- [ ] Verify PDF file is under 10MB
- [ ] Check file is actually a PDF
- [ ] Check backend uploads folder exists
- [ ] Verify sufficient disk space
- [ ] Check file permissions

## Performance Checklist

### Optimization Checks
- [ ] Bundle size reasonable (run `npm run build`)
- [ ] No console errors in production
- [ ] API calls complete in reasonable time
- [ ] No memory leaks visible
- [ ] Database queries optimized

### Security Checks
- [ ] API keys not committed to git
- [ ] CORS properly configured
- [ ] File upload size limits in place
- [ ] Input validation working
- [ ] Error messages don't expose sensitive info

## Deployment Checklist (Optional)

### Pre-Deployment
- [ ] All features tested and working
- [ ] Production environment variables ready
- [ ] Database (MongoDB Atlas) set up
- [ ] Choose hosting platform (Vercel, Netlify, Heroku, etc.)

### Frontend Deployment
- [ ] Run `npm run build` in frontend
- [ ] Test production build locally
- [ ] Deploy dist folder
- [ ] Update API endpoint URLs
- [ ] Verify deployment works

### Backend Deployment
- [ ] Set all environment variables
- [ ] Deploy to hosting service
- [ ] Update frontend API_BASE_URL
- [ ] Test all endpoints
- [ ] Monitor logs for errors

## Post-Deployment Checklist

### Monitoring
- [ ] Set up error tracking (optional)
- [ ] Monitor API usage and costs
- [ ] Check database performance
- [ ] Review user feedback
- [ ] Plan updates and improvements

## Final Verification

- [ ] All core features working
- [ ] No critical bugs
- [ ] Documentation complete
- [ ] Code is clean and commented
- [ ] Project ready for demo/portfolio
- [ ] README badges updated (optional)

---

## Quick Command Reference

```powershell
# Setup project
.\setup.ps1

# Start development
.\start.ps1
# OR
npm run dev

# Backend only
cd backend
node server.js

# Frontend only
cd frontend
npm run dev

# Build frontend
cd frontend
npm run build

# Check MongoDB
Get-Service MongoDB
# OR
mongod
```

## Support Resources

- **Main Documentation**: README.md
- **Setup Guide**: INSTALLATION.md
- **Project Overview**: PROJECT_SUMMARY.md
- **API Documentation**: README.md (API section)

---

**When all checkboxes are complete, your AutoPromptLab is ready! 🎉**

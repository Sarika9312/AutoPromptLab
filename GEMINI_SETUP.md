# 🚀 Quick Start - Gemini Only Version

## ✅ What Changed

Your AutoPromptLab now uses **ONLY Google Gemini API** which is:
- ✅ **100% FREE**
- ✅ **No credit card required**
- ✅ **60 requests per minute**
- ✅ **Perfect for development**

## 🔑 Step 1: Get Your Free Gemini API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

## 📝 Step 2: Add Key to .env File

Open `.env` file and replace:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

With your actual key:
```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## 🗄️ Step 3: MongoDB Setup

### Option A: MongoDB Atlas (Cloud - Easy!)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a free cluster (M0)
4. Get connection string
5. Update `.env`:
```env
MONGODB_URI=your_mongodb_connection_string_here
```

### Option B: Local MongoDB
Install MongoDB locally and run:
```powershell
mongod
```

## 🚀 Step 4: Run the App

```powershell
npm run dev
```

## 🌐 Step 5: Access

Open: http://localhost:5173

## 🎯 What Works Now

✅ **Prompt Tester** - Test prompts with Gemini
✅ **RAG Uploader** - Upload PDFs (uses Gemini for embeddings)
✅ **Benchmark** - View Gemini performance
✅ **Workflow Generator** - Generate workflows with Gemini

## 💡 Tips

- Gemini is fast and accurate
- Free tier is generous for testing
- No need for other API keys!

---

**Ready? Add your Gemini API key and run `npm run dev`! 🎉**

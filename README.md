# 🚀 AutoPromptLab

> A production-quality AI web application for prompt testing, RAG search, model benchmarking, and workflow generation.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

AutoPromptLab is a comprehensive AI testing and benchmarking platform powered by **Google Gemini API (100% FREE)** that enables developers and AI engineers to:

- **Test prompts** using Google Gemini AI
- **Upload and query PDFs** using Retrieval-Augmented Generation (RAG) with text-based matching
- **Benchmark AI performance** with detailed metrics and visualizations
- **Generate workflow documentation** for any task using AI

Built with modern web technologies and designed for scalability, AutoPromptLab provides an intuitive interface for working with cutting-edge AI models **at zero cost**.

## ✨ Features

### 🧪 Prompt Tester
- Test prompts using Google Gemini AI (FREE)
- Real-time response generation
- Automatic scoring (accuracy, creativity, coherence)
- Real-time latency tracking
- Interactive radar charts for score visualization
- Prompt tips and best practices

### 📄 RAG Uploader
- Drag-and-drop PDF upload
- Automatic document chunking with text-based matching
- Keyword search across uploaded documents
- Source citation with similarity scores
- Document management (upload, view, delete)
- Context-aware answer generation using Gemini

### 📊 Benchmark Dashboard
- Comprehensive model comparison
- Multi-metric analysis (accuracy, creativity, coherence, latency)
- Interactive charts and visualizations
- Historical test data aggregation
- Overall performance scoring
- Model-specific statistics

### 🔄 Workflow Generator
- AI-powered workflow creation
- Step-by-step process visualization
- Complete documentation generation
- Pre-built templates
- Export functionality (copy/download)
- Industry-specific workflows

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Chart library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Dropzone** - File upload

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Google Generative AI** - Gemini API (FREE)
- **Multer** - File upload middleware
- **pdf-parse** - PDF text extraction

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   Home   │  │  Prompt  │  │   RAG    │  │Benchmark │  │
│  │   Page   │  │  Tester  │  │ Uploader │  │Dashboard │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│         React + Vite + Tailwind CSS + Framer Motion        │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTPS/REST API
┌───────────────────────┴─────────────────────────────────────┐
│                    BACKEND (Express)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Routes Layer                            │  │
│  │  /api/prompt  /api/rag  /api/benchmark  /api/workflow│  │
│  └────────────────────┬─────────────────────────────────┘  │
│  ┌────────────────────┴─────────────────────────────────┐  │
│  │           Controllers Layer                          │  │
│  │  Business Logic & Request Handling                   │  │
│  └────────────────────┬─────────────────────────────────┘  │
│  ┌────────────────────┴─────────────────────────────────┐  │
│  │            Services Layer                            │  │
│  │  AI Service | RAG Service | Scoring Utils            │  │
│  └───┬────────────┬─────────────┬───────────────────────┘  │
│      │            │             │                           │
│      └────────────┴──────────────┘                          │
│              Google Gemini API (FREE)                      │
└───────────────────────┬─────────────────────────────────────┘
                        │ Mongoose ODM
┌───────────────────────┴─────────────────────────────────────┐
│                    MongoDB Database                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │Documents │  │PromptTest│  │Benchmark │                 │
│  │Collection│  │Collection│  │Collection│                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or Atlas)
- API Key:
  - **Google Gemini API Key** (FREE - Get it at https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd AutoPromptLab
```

2. **Install root dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

4. **Install frontend dependencies**
```bash
cd frontend
npm install
cd ..
```

5. **Configure environment variables**

Copy `.env.example` to `.env` in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/autopromptlab

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Anthropic Claude
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# CORS
FRONTEND_URL=http://localhost:5173
```

6. **Start MongoDB**

If using local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas (cloud) and update `MONGODB_URI` accordingly.

7. **Start the application**

**Option A: Run both frontend and backend concurrently (from root)**
```bash
npm run dev
```

**Option B: Run separately**

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

8. **Access the application**

Open your browser and navigate to:
```
http://localhost:5173
```

Backend API will be running on:
```
http://localhost:5000
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Prompt Testing

**POST /prompt/test**
- Test a prompt across multiple AI models
- Body:
```json
{
  "prompt": "Explain quantum computing",
  "models": ["openai", "gemini", "claude"] // or ["all"]
}
```
- Response:
```json
{
  "success": true,
  "data": {
    "openai": {
      "text": "Response text...",
      "latency": 1250,
      "scores": {
        "accuracy": 85,
        "creativity": 78,
        "coherence": 92
      }
    },
    "gemini": { ... },
    "claude": { ... }
  }
}
```

**GET /prompt/history**
- Get prompt testing history
- Response: Array of prompt test records

#### RAG (Retrieval-Augmented Generation)

**POST /rag/upload**
- Upload a PDF document
- Form Data: `document` (file)
- Response:
```json
{
  "success": true,
  "data": {
    "documentId": "...",
    "filename": "document.pdf",
    "chunksCount": 15,
    "uploadedAt": "2024-12-11T..."
  }
}
```

**POST /rag/query**
- Query uploaded documents
- Body:
```json
{
  "query": "What is the main topic?"
}
```
- Response:
```json
{
  "success": true,
  "data": {
    "answer": "The main topic is...",
    "sources": [
      {
        "index": 1,
        "text": "Chunk text...",
        "document": "document.pdf",
        "similarity": "0.892",
        "used": true
      }
    ]
  }
}
```

**GET /rag/documents**
- Get all uploaded documents

**DELETE /rag/documents/:id**
- Delete a document

#### Benchmarking

**GET /benchmark/report**
- Get comprehensive benchmark report for all models
- Response:
```json
{
  "success": true,
  "data": [
    {
      "model": "openai",
      "metrics": {
        "accuracy": 87,
        "creativity": 82,
        "coherence": 90,
        "latency": 1200
      },
      "testCount": 50
    }
  ]
}
```

**GET /benchmark/compare**
- Compare specific models
- Query: `models=openai,gemini`

#### Workflow Generation

**POST /workflow/generate**
- Generate a workflow
- Body:
```json
{
  "taskDescription": "Create a customer onboarding process"
}
```

**GET /workflow/templates**
- Get workflow templates

### Error Responses

All endpoints return errors in the format:
```json
{
  "success": false,
  "error": "Error message"
}
```

## 📁 Project Structure

```
AutoPromptLab/
├── backend/
│   ├── config/
│   │   ├── aiClients.js      # AI service clients configuration
│   │   ├── database.js       # MongoDB connection
│   │   └── multer.js         # File upload configuration
│   ├── controllers/
│   │   ├── promptController.js
│   │   ├── ragController.js
│   │   ├── benchmarkController.js
│   │   └── workflowController.js
│   ├── models/
│   │   ├── Document.js       # Document schema
│   │   ├── PromptTest.js     # Prompt test schema
│   │   └── Benchmark.js      # Benchmark schema
│   ├── routes/
│   │   ├── promptRoutes.js
│   │   ├── ragRoutes.js
│   │   ├── benchmarkRoutes.js
│   │   └── workflowRoutes.js
│   ├── services/
│   │   ├── aiService.js      # AI model integrations
│   │   └── ragService.js     # RAG functionality
│   ├── utils/
│   │   ├── errorHandler.js   # Error handling middleware
│   │   ├── textProcessing.js # Text chunking and similarity
│   │   └── scoring.js        # Response scoring algorithms
│   ├── uploads/              # Temporary file storage
│   ├── package.json
│   └── server.js            # Application entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Textarea.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── Badge.jsx
│   │   │   ├── charts/
│   │   │   │   ├── ScoreChart.jsx
│   │   │   │   └── BarChart.jsx
│   │   │   └── layout/
│   │   │       ├── Layout.jsx
│   │   │       ├── Navbar.jsx
│   │   │       └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── PromptTesterPage.jsx
│   │   │   ├── RAGUploaderPage.jsx
│   │   │   ├── BenchmarkDashboardPage.jsx
│   │   │   └── WorkflowGeneratorPage.jsx
│   │   ├── services/
│   │   │   └── api.js        # API client
│   │   ├── utils/
│   │   │   └── helpers.js    # Utility functions
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 📸 Screenshots

### Home Page
*Beautiful landing page with gradient backgrounds and glassmorphism effects*

[Placeholder for screenshot]

### Prompt Tester
*Side-by-side comparison of AI model responses with scoring*

[Placeholder for screenshot]

### RAG Uploader
*Drag-and-drop PDF upload with semantic search*

[Placeholder for screenshot]

### Benchmark Dashboard
*Interactive charts comparing model performance*

[Placeholder for screenshot]

### Workflow Generator
*AI-powered workflow diagram generation*

[Placeholder for screenshot]

## ⚙️ Configuration

### Frontend Configuration

**Vite Proxy Setup** (`frontend/vite.config.js`)
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
}
```

**Tailwind Theme** (`frontend/tailwind.config.js`)
- Custom color palette
- Animation extensions
- Glassmorphism utilities

### Backend Configuration

**CORS Settings** (`backend/server.js`)
```javascript
cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
})
```

**File Upload Limits** (`backend/config/multer.js`)
- Max file size: 10MB
- Allowed types: PDF only

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Code Quality

**Linting**
```bash
npm run lint
```

**Formatting**
```bash
npm run format
```

### Hot Reload

Both frontend and backend support hot reload during development:
- Frontend: Vite HMR
- Backend: Use `nodemon` for auto-restart

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)
*Beautiful landing page with gradient design and feature highlights*

### Prompt Tester
![Prompt Tester](screenshots/prompt-tester.png)
*Test your prompts with Google Gemini AI and get instant responses with scoring*

### RAG Uploader
![RAG Uploader](screenshots/rag-uploader.png)
*Upload PDFs and ask questions - get AI-powered answers with source citations*

### Benchmark Dashboard
![Benchmark Dashboard](screenshots/benchmark.png)
*Comprehensive analytics and performance metrics visualization*

### Workflow Generator
![Workflow Generator](screenshots/workflow.png)
*Generate step-by-step workflows for any task using AI*

## 🚀 Future Enhancements

- [ ] User authentication and authorization
- [ ] Workspace/project management
- [ ] Custom model fine-tuning interface
- [ ] Collaborative prompt editing
- [ ] Advanced analytics and insights
- [ ] Export reports to PDF
- [ ] API rate limiting and caching
- [ ] Real-time collaboration features
- [ ] Mobile-responsive optimizations
- [ ] Dark mode support
- [ ] Integration with more AI providers (Cohere, AI21, etc.)
- [ ] Prompt version control
- [ ] A/B testing for prompts
- [ ] Cost tracking and optimization
- [ ] Automated prompt optimization suggestions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

- **Sarika Panchalwar** - Full Stack Development
  - Email: sarikapanchalwar@gmail.com
  - GitHub: [@Sarika9312](https://github.com/Sarika9312)

## 🙏 Acknowledgments

- Google for the FREE Gemini API
- The open-source community
- All contributors and supporters

## 📞 Support

For support, email sarikapanchalwar@gmail.com or open an issue in the repository.

---

**Made with ❤️ and AI**

# 🌳 AutoPromptLab - Complete File Tree

```
AutoPromptLab/
│
├── 📄 README.md                    ⭐ Main documentation (comprehensive)
├── 📄 INSTALLATION.md              📖 Step-by-step setup guide
├── 📄 PROJECT_SUMMARY.md           📊 Project overview and statistics
├── 📄 CHECKLIST.md                 ✅ Setup and testing checklist
├── 📄 LICENSE                      ⚖️  MIT License
├── 📄 .gitignore                   🚫 Git ignore rules
├── 📄 .env.example                 🔐 Environment variables template
├── 📄 package.json                 📦 Root package config (concurrent scripts)
├── 📄 setup.ps1                    🔧 Automated setup script
└── 📄 start.ps1                    🚀 Quick start script
│
├── 📁 backend/                     🖥️  SERVER SIDE
│   │
│   ├── 📄 server.js                ⭐ Main entry point
│   ├── 📄 package.json             📦 Backend dependencies
│   │
│   ├── 📁 config/                  ⚙️  Configuration
│   │   ├── aiClients.js            🤖 OpenAI, Gemini, Claude setup
│   │   ├── database.js             🗄️  MongoDB connection
│   │   └── multer.js               📎 File upload config
│   │
│   ├── 📁 controllers/             🎮 Business Logic
│   │   ├── promptController.js     🧪 Prompt testing endpoints
│   │   ├── ragController.js        📄 RAG upload & query
│   │   ├── benchmarkController.js  📊 Benchmark data
│   │   └── workflowController.js   🔄 Workflow generation
│   │
│   ├── 📁 models/                  📋 Database Schemas
│   │   ├── Document.js             📄 PDF documents & embeddings
│   │   ├── PromptTest.js           🧪 Test results
│   │   └── Benchmark.js            📊 Model metrics
│   │
│   ├── 📁 routes/                  🛣️  API Routes
│   │   ├── promptRoutes.js         🧪 /api/prompt/*
│   │   ├── ragRoutes.js            📄 /api/rag/*
│   │   ├── benchmarkRoutes.js      📊 /api/benchmark/*
│   │   └── workflowRoutes.js       🔄 /api/workflow/*
│   │
│   ├── 📁 services/                🔧 Core Services
│   │   ├── aiService.js            🤖 LLM API integrations
│   │   └── ragService.js           🔍 RAG search logic
│   │
│   ├── 📁 utils/                   🛠️  Utilities
│   │   ├── errorHandler.js         ❌ Error middleware
│   │   ├── textProcessing.js       ✂️  Chunking & similarity
│   │   └── scoring.js              🎯 Response evaluation
│   │
│   └── 📁 uploads/                 📦 Temporary files
│       └── .gitkeep                (keep folder in git)
│
└── 📁 frontend/                    🌐 CLIENT SIDE
    │
    ├── 📄 index.html               🏠 HTML entry point
    ├── 📄 package.json             📦 Frontend dependencies
    ├── 📄 vite.config.js           ⚡ Vite configuration
    ├── 📄 tailwind.config.js       🎨 Tailwind setup
    └── 📄 postcss.config.js        🖌️  PostCSS config
    │
    └── 📁 src/                     📂 Source Code
        │
        ├── 📄 main.jsx             ⭐ React entry point
        ├── 📄 App.jsx              🎯 Router & main app
        ├── 📄 index.css            🎨 Global styles (Tailwind)
        │
        ├── 📁 pages/               📄 Main Pages
        │   ├── HomePage.jsx        🏠 Landing page
        │   ├── PromptTesterPage.jsx 🧪 Test prompts
        │   ├── RAGUploaderPage.jsx  📄 Upload & query PDFs
        │   ├── BenchmarkDashboardPage.jsx 📊 Model comparison
        │   └── WorkflowGeneratorPage.jsx 🔄 Generate workflows
        │
        ├── 📁 components/          🧩 Reusable Components
        │   │
        │   ├── 📁 ui/              🎨 UI Components
        │   │   ├── Button.jsx      🔘 Button with variants
        │   │   ├── Card.jsx        📇 Glass card
        │   │   ├── Input.jsx       ⌨️  Input field
        │   │   ├── Textarea.jsx    📝 Textarea
        │   │   ├── Badge.jsx       🏷️  Badge/tag
        │   │   └── Loader.jsx      ⏳ Loading spinner
        │   │
        │   ├── 📁 charts/          📈 Chart Components
        │   │   ├── ScoreChart.jsx  📊 Radar chart
        │   │   └── BarChart.jsx    📊 Bar chart
        │   │
        │   └── 📁 layout/          🏗️  Layout Components
        │       ├── Layout.jsx      📐 Main layout wrapper
        │       ├── Navbar.jsx      🧭 Navigation bar
        │       └── Footer.jsx      📌 Footer
        │
        ├── 📁 services/            🌐 API Integration
        │   └── api.js              📡 Axios client & endpoints
        │
        └── 📁 utils/               🛠️  Helper Functions
            └── helpers.js          🔧 Date, format, copy utils
```

## 📊 File Count by Category

| Category | Count | Purpose |
|----------|-------|---------|
| 📄 Documentation | 5 | README, guides, checklists |
| 🔧 Config Files | 9 | Package.json, env, tailwind, etc. |
| 🖥️  Backend Files | 15 | API, controllers, services |
| 🌐 Frontend Files | 20+ | Pages, components, utils |
| 📜 Scripts | 2 | Setup and start scripts |
| **TOTAL** | **60+** | Complete full-stack app |

## 🎯 Key Files to Understand

### Backend
1. `backend/server.js` - Start here to understand server setup
2. `backend/routes/*` - See all API endpoints
3. `backend/controllers/*` - Business logic for each feature
4. `backend/services/aiService.js` - AI model integrations
5. `backend/services/ragService.js` - RAG implementation

### Frontend
1. `frontend/src/App.jsx` - Router and page structure
2. `frontend/src/pages/HomePage.jsx` - Landing page
3. `frontend/src/pages/PromptTesterPage.jsx` - Main feature
4. `frontend/src/components/ui/*` - Reusable UI components
5. `frontend/src/services/api.js` - API calls

## 📝 Code Statistics

```
Total Lines of Code: ~5,000+
Backend: ~2,000 lines
Frontend: ~3,000 lines
```

## 🎨 File Naming Conventions

- **PascalCase**: React components (`HomePage.jsx`)
- **camelCase**: Services, utilities (`aiService.js`)
- **UPPERCASE**: Constants, environment (`.env`)
- **kebab-case**: Config files (`vite.config.js`)

## 🚀 Execution Flow

```
User Opens Browser
    ↓
http://localhost:5173 (Frontend)
    ↓
React Router → Pages
    ↓
User Interaction
    ↓
API Call (services/api.js)
    ↓
http://localhost:5000/api/* (Backend)
    ↓
Routes → Controllers → Services
    ↓
External APIs (OpenAI/Gemini/Claude)
    ↓
MongoDB (Store Results)
    ↓
Response to Frontend
    ↓
Display in UI with Charts
```

## 💡 Understanding the Structure

### Backend Pattern: MVC-like
```
Routes (URL mapping)
    ↓
Controllers (Request handling)
    ↓
Services (Business logic)
    ↓
Models (Database)
```

### Frontend Pattern: Component-based
```
App (Router)
    ↓
Layout (Navbar + Content + Footer)
    ↓
Pages (Feature pages)
    ↓
Components (Reusable UI)
    ↓
Services (API calls)
```

## 🎯 Where to Start Coding

**For Backend Changes:**
- Add new API: Create in `routes/`, `controllers/`
- Add AI model: Update `services/aiService.js`
- Change database: Update `models/`

**For Frontend Changes:**
- New page: Add to `pages/` and update `App.jsx`
- New component: Add to `components/ui/`
- New API call: Update `services/api.js`
- Styling: Update `tailwind.config.js` or components

---

**Use this tree as a reference while navigating the project! 🗺️**

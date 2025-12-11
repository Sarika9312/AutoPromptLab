/**
 * Main Application Component
 * Router configuration and layout
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PromptTesterPage from './pages/PromptTesterPage';
import RAGUploaderPage from './pages/RAGUploaderPage';
import BenchmarkDashboardPage from './pages/BenchmarkDashboardPage';
import WorkflowGeneratorPage from './pages/WorkflowGeneratorPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prompt-tester" element={<PromptTesterPage />} />
          <Route path="/rag-uploader" element={<RAGUploaderPage />} />
          <Route path="/benchmark" element={<BenchmarkDashboardPage />} />
          <Route path="/workflow" element={<WorkflowGeneratorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

/**
 * API Service
 * Centralized API calls to the backend
 */

import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Prompt API
export const promptAPI = {
  test: async (prompt, models = ['all']) => {
    const response = await api.post('/prompt/test', { prompt, models });
    return response.data;
  },
  
  getHistory: async () => {
    const response = await api.get('/prompt/history');
    return response.data;
  },
};

// RAG API
export const ragAPI = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append('document', file);
    
    const response = await api.post('/rag/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  query: async (query) => {
    const response = await api.post('/rag/query', { query });
    return response.data;
  },
  
  getDocuments: async () => {
    const response = await api.get('/rag/documents');
    return response.data;
  },
  
  deleteDocument: async (id) => {
    const response = await api.delete(`/rag/documents/${id}`);
    return response.data;
  },
};

// Benchmark API
export const benchmarkAPI = {
  getReport: async () => {
    const response = await api.get('/benchmark/report');
    return response.data;
  },
  
  compare: async (models) => {
    const response = await api.get('/benchmark/compare', {
      params: { models: models.join(',') },
    });
    return response.data;
  },
};

// Workflow API
export const workflowAPI = {
  generate: async (taskDescription) => {
    const response = await api.post('/workflow/generate', { taskDescription });
    return response.data;
  },
  
  getTemplates: async () => {
    const response = await api.get('/workflow/templates');
    return response.data;
  },
};

export default api;

/**
 * AutoPromptLab Backend Server
 * Main entry point for the Express application
 */

require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const promptRoutes = require('./routes/promptRoutes');
const ragRoutes = require('./routes/ragRoutes');
const benchmarkRoutes = require('./routes/benchmarkRoutes');
const workflowRoutes = require('./routes/workflowRoutes');

// Import middleware
const errorHandler = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/prompt', promptRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/benchmark', benchmarkRoutes);
app.use('/api/workflow', workflowRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AutoPromptLab API is running' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;

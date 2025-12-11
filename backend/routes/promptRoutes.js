/**
 * Prompt Routes
 * Routes for prompt testing functionality
 */

const express = require('express');
const router = express.Router();
const { testPrompt, getPromptHistory } = require('../controllers/promptController');

// Test a prompt with AI models
router.post('/test', testPrompt);

// Get prompt testing history
router.get('/history', getPromptHistory);

module.exports = router;

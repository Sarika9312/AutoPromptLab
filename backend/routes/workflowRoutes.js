/**
 * Workflow Routes
 * Routes for AI workflow generation
 */

const express = require('express');
const router = express.Router();
const { generateWorkflow, getWorkflowTemplates } = require('../controllers/workflowController');

// Generate a workflow
router.post('/generate', generateWorkflow);

// Get workflow templates
router.get('/templates', getWorkflowTemplates);

module.exports = router;

/**
 * Workflow Controller
 * Handles AI workflow generation
 */

const { callGemini } = require('../services/aiService');

/**
 * Generate a workflow based on task description
 * @route POST /api/workflow/generate
 */
const generateWorkflow = async (req, res, next) => {
  try {
    const { taskDescription } = req.body;
    
    if (!taskDescription) {
      return res.status(400).json({ success: false, error: 'Task description is required' });
    }
    
    // Create prompt for workflow generation
    const prompt = `You are an AI workflow architect. Generate a detailed workflow for the following task:

Task: ${taskDescription}

Please provide:
1. A step-by-step workflow (numbered list)
2. Key considerations and best practices
3. Potential challenges and solutions
4. Tools or technologies recommended

Format your response in a structured way with clear sections.`;
    
    // Generate workflow using Gemini (FREE)
    const response = await callGemini(prompt);
    
    // Parse the response into workflow steps
    const workflowText = response.text;
    const lines = workflowText.split('\n').filter(line => line.trim());
    
    // Extract numbered steps
    const steps = [];
    const stepRegex = /^\d+\./;
    
    lines.forEach(line => {
      if (stepRegex.test(line.trim())) {
        steps.push({
          title: line.trim(),
          description: '',
        });
      }
    });
    
    res.json({
      success: true,
      data: {
        taskDescription,
        workflow: {
          steps,
          fullDocumentation: workflowText,
        },
        generatedAt: new Date(),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get workflow templates
 * @route GET /api/workflow/templates
 */
const getWorkflowTemplates = async (req, res, next) => {
  try {
    const templates = [
      {
        id: 1,
        name: 'Data Analysis Pipeline',
        description: 'Extract, transform, analyze, and visualize data',
        category: 'Data Science',
      },
      {
        id: 2,
        name: 'Content Generation Workflow',
        description: 'Research, outline, draft, edit, and publish content',
        category: 'Content Creation',
      },
      {
        id: 3,
        name: 'Customer Support Automation',
        description: 'Classify, prioritize, respond, and escalate support tickets',
        category: 'Customer Service',
      },
      {
        id: 4,
        name: 'Code Review Process',
        description: 'Analyze, test, review, and merge code changes',
        category: 'Software Development',
      },
    ];
    
    res.json({
      success: true,
      data: templates,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateWorkflow,
  getWorkflowTemplates,
};

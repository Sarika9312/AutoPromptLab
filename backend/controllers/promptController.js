/**
 * Prompt Controller
 * Handles prompt testing endpoints
 */

const PromptTest = require('../models/PromptTest');
const { callGemini } = require('../services/aiService');
const { generateScores } = require('../utils/scoring');

/**
 * Test a prompt with Gemini AI model (FREE)
 * @route POST /api/prompt/test
 */
const testPrompt = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }
    
    let responses = {};
    
    // Call Gemini only (FREE API)
    try {
      const geminiResponse = await callGemini(prompt);
      responses.gemini = geminiResponse;
    } catch (error) {
      console.error('Gemini Error:', error);
      responses.gemini = { 
        text: 'Error: Failed to get response from Gemini', 
        latency: 0, 
        error: error.message 
      };
    }
    
    // Generate scores for the response
    const scoredResponses = {};
    
    if (responses.gemini && responses.gemini.text && !responses.gemini.error) {
      const scores = generateScores(responses.gemini.text, prompt);
      
      scoredResponses.gemini = {
        text: responses.gemini.text,
        latency: responses.gemini.latency,
        scores,
      };
      
      // Save to database
      await PromptTest.create({
        prompt,
        model: 'gemini',
        response: responses.gemini.text,
        scores,
        latency: responses.gemini.latency,
      });
    } else {
      scoredResponses.gemini = responses.gemini;
    }
    
    res.json({
      success: true,
      data: scoredResponses,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get prompt testing history
 * @route GET /api/prompt/history
 */
const getPromptHistory = async (req, res, next) => {
  try {
    const history = await PromptTest.find({})
      .sort({ testedAt: -1 })
      .limit(50);
    
    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  testPrompt,
  getPromptHistory,
};

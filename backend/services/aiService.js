/**
 * AI Service (Gemini-only version - 100% FREE)
 * Handles interactions with Google Gemini API
 */

const { genAI } = require('../config/aiClients');

/**
 * Call Google Gemini API with a prompt
 * @param {string} prompt - User prompt
 * @returns {Promise<Object>} Response with text and latency
 */
const callGemini = async (prompt) => {
  const startTime = Date.now();
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const latency = Date.now() - startTime;
    
    return {
      text,
      latency,
    };
  } catch (error) {
    console.error('Gemini Error:', error.message);
    throw new Error(`Gemini API Error: ${error.message}`);
  }
};

module.exports = {
  callGemini,
};

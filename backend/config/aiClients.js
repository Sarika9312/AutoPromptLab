/**
 * AI Services Configuration (Gemini-only version - 100% FREE)
 * Configuration for Google Gemini AI client
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Google Gemini Client (FREE API)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = {
  genAI,
};

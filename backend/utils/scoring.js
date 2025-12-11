/**
 * Scoring Utilities
 * Functions to score AI model responses
 */

/**
 * Calculate accuracy score based on response quality
 * @param {string} response - AI response to score
 * @param {string} prompt - Original prompt
 * @returns {number} Accuracy score (0-100)
 */
const calculateAccuracy = (response, prompt) => {
  let score = 70; // Base score
  
  // Check response length (appropriate depth)
  if (response.length > 100 && response.length < 2000) score += 10;
  
  // Check if response addresses the prompt
  const promptKeywords = prompt.toLowerCase().split(/\s+/).filter(w => w.length > 4);
  const responseText = response.toLowerCase();
  const keywordMatches = promptKeywords.filter(kw => responseText.includes(kw)).length;
  score += Math.min(keywordMatches * 2, 20);
  
  return Math.min(score, 100);
};

/**
 * Calculate creativity score
 * @param {string} response - AI response to score
 * @returns {number} Creativity score (0-100)
 */
const calculateCreativity = (response) => {
  let score = 60; // Base score
  
  // Check vocabulary diversity
  const words = response.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  const diversityRatio = uniqueWords.size / words.length;
  score += diversityRatio * 30;
  
  // Check for varied sentence structure
  const sentences = response.split(/[.!?]+/);
  if (sentences.length > 3) score += 10;
  
  return Math.min(Math.round(score), 100);
};

/**
 * Calculate coherence score
 * @param {string} response - AI response to score
 * @returns {number} Coherence score (0-100)
 */
const calculateCoherence = (response) => {
  let score = 70; // Base score
  
  // Check sentence structure
  const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length >= 2) score += 10;
  
  // Check for proper punctuation
  const punctuationCount = (response.match(/[.!?,;:]/g) || []).length;
  if (punctuationCount > 2) score += 10;
  
  // Check paragraph structure
  const paragraphs = response.split(/\n\n+/).filter(p => p.trim().length > 0);
  if (paragraphs.length > 1) score += 10;
  
  return Math.min(score, 100);
};

/**
 * Generate comprehensive scores for a response
 * @param {string} response - AI response to score
 * @param {string} prompt - Original prompt
 * @returns {Object} Object with accuracy, creativity, coherence scores
 */
const generateScores = (response, prompt) => {
  return {
    accuracy: calculateAccuracy(response, prompt),
    creativity: calculateCreativity(response),
    coherence: calculateCoherence(response),
  };
};

module.exports = {
  calculateAccuracy,
  calculateCreativity,
  calculateCoherence,
  generateScores,
};

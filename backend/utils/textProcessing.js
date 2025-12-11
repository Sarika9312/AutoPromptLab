/**
 * Text Processing Utilities
 * Helper functions for text chunking and processing
 */

/**
 * Split text into chunks of specified token size
 * @param {string} text - Text to chunk
 * @param {number} maxTokens - Maximum tokens per chunk
 * @returns {Array<string>} Array of text chunks
 */
const createChunks = (text, maxTokens = 500) => {
  // Approximate: 1 token ≈ 4 characters
  const maxChars = maxTokens * 4;
  const chunks = [];
  
  // Split by paragraphs first
  const paragraphs = text.split(/\n\n+/);
  let currentChunk = '';
  
  for (const paragraph of paragraphs) {
    if ((currentChunk + paragraph).length <= maxChars) {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      
      // If paragraph itself is too long, split by sentences
      if (paragraph.length > maxChars) {
        const sentences = paragraph.split(/[.!?]+\s+/);
        currentChunk = '';
        
        for (const sentence of sentences) {
          if ((currentChunk + sentence).length <= maxChars) {
            currentChunk += (currentChunk ? '. ' : '') + sentence;
          } else {
            if (currentChunk) {
              chunks.push(currentChunk.trim());
            }
            currentChunk = sentence;
          }
        }
      } else {
        currentChunk = paragraph;
      }
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks.filter(chunk => chunk.length > 0);
};

/**
 * Calculate cosine similarity between two vectors
 * @param {Array<number>} vecA - First vector
 * @param {Array<number>} vecB - Second vector
 * @returns {number} Similarity score (0-1)
 */
const cosineSimilarity = (vecA, vecB) => {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have same length');
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

module.exports = {
  createChunks,
  cosineSimilarity,
};

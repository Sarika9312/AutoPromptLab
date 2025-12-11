/**
 * RAG Service (Gemini-only version with simple text matching)
 * Retrieval-Augmented Generation service for document querying
 */

const Document = require('../models/Document');
const { callGemini } = require('./aiService');

/**
 * Calculate simple text similarity (keyword matching)
 * @param {string} query - Search query
 * @param {string} text - Text to compare
 * @returns {number} Similarity score
 */
const simpleTextSimilarity = (query, text) => {
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const textLower = text.toLowerCase();
  
  let matches = 0;
  for (const word of queryWords) {
    if (textLower.includes(word)) {
      matches++;
    }
  }
  
  return queryWords.length > 0 ? matches / queryWords.length : 0;
};

/**
 * Find relevant document chunks using simple text matching (no embeddings needed)
 * @param {string} query - User query
 * @param {number} topK - Number of top chunks to retrieve
 * @returns {Promise<Array>} Array of relevant chunks with similarity scores
 */
const findRelevantChunks = async (query, topK = 3) => {
  try {
    // Get all documents
    const documents = await Document.find({});
    
    if (documents.length === 0) {
      throw new Error('No documents uploaded yet');
    }
    
    // Calculate text similarity for all chunks
    const allChunks = [];
    
    for (const doc of documents) {
      for (const chunk of doc.chunks) {
        const similarity = simpleTextSimilarity(query, chunk.text);
        allChunks.push({
          text: chunk.text,
          similarity,
          documentName: doc.originalName,
          chunkIndex: chunk.chunkIndex,
        });
      }
    }
    
    // Sort by similarity and take top K
    allChunks.sort((a, b) => b.similarity - a.similarity);
    
    return allChunks.slice(0, topK);
  } catch (error) {
    console.error('RAG Search Error:', error.message);
    throw error;
  }
};

/**
 * Generate answer using RAG
 * @param {string} query - User query
 * @param {Array} relevantChunks - Retrieved relevant chunks
 * @returns {Promise<Object>} Generated answer with citations
 */
const generateRAGAnswer = async (query, relevantChunks) => {
  try {
    // Construct context from relevant chunks
    const context = relevantChunks
      .map((chunk, idx) => `[${idx + 1}] ${chunk.text}`)
      .join('\n\n');
    
    // Create prompt with context
    const prompt = `Based on the following context, answer the question. Cite sources using [1], [2], etc.

Context:
${context}

Question: ${query}

Answer:`;
    
    // Generate answer using Gemini (FREE)
    const geminiResponse = await callGemini(prompt);
    const answer = geminiResponse.text;
    
    // Extract citations used in the answer
    const citationMatches = answer.match(/\[(\d+)\]/g) || [];
    const citationsUsed = [...new Set(citationMatches.map(c => parseInt(c.match(/\d+/)[0])))];
    
    return {
      answer,
      sources: relevantChunks.map((chunk, idx) => ({
        index: idx + 1,
        text: chunk.text.substring(0, 200) + '...',
        document: chunk.documentName,
        similarity: chunk.similarity.toFixed(3),
        used: citationsUsed.includes(idx + 1),
      })),
    };
  } catch (error) {
    console.error('RAG Answer Generation Error:', error.message);
    throw error;
  }
};

module.exports = {
  findRelevantChunks,
  generateRAGAnswer,
};

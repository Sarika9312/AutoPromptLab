/**
 * RAG Controller
 * Handles document upload and RAG querying (Gemini-only version)
 */

const Document = require('../models/Document');
const { findRelevantChunksSimple, generateRAGAnswer } = require('../services/ragService');
const { createChunks } = require('../utils/textProcessing');
const pdfParse = require('pdf-parse');
const fs = require('fs').promises;

/**
 * Upload and process a PDF document (text-based matching, no embeddings)
 * @route POST /api/rag/upload
 */
const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    
    const file = req.file;
    
    // Read PDF file
    const dataBuffer = await fs.readFile(file.path);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;
    
    // Create chunks
    const textChunks = createChunks(text, 500);
    
    // Store chunks without embeddings (using simple text matching)
    const chunks = textChunks.map((text, index) => ({
      text,
      chunkIndex: index,
      embedding: [], // Empty array for compatibility
    }));
    
    // Save to database
    const document = await Document.create({
      filename: file.filename,
      originalName: file.originalname,
      content: text,
      chunks: chunks,
    });
    
    // Delete the uploaded file
    await fs.unlink(file.path);
    
    res.json({
      success: true,
      data: {
        documentId: document._id,
        filename: document.originalName,
        chunksCount: chunksWithEmbeddings.length,
        uploadedAt: document.uploadedAt,
      },
    });
  } catch (error) {
    // Clean up file if error occurs
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
};

/**
 * Query documents using RAG
 * @route POST /api/rag/query
 */
const queryDocuments = async (req, res, next) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ success: false, error: 'Query is required' });
    }
    
    // Find relevant chunks
    const relevantChunks = await findRelevantChunks(query, 3);
    
    // Generate answer
    const result = await generateRAGAnswer(query, relevantChunks);
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all uploaded documents
 * @route GET /api/rag/documents
 */
const getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find({})
      .select('originalName uploadedAt chunks')
      .sort({ uploadedAt: -1 });
    
    const documentList = documents.map(doc => ({
      id: doc._id,
      name: doc.originalName,
      chunksCount: doc.chunks.length,
      uploadedAt: doc.uploadedAt,
    }));
    
    res.json({
      success: true,
      data: documentList,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a document
 * @route DELETE /api/rag/documents/:id
 */
const deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await Document.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadDocument,
  queryDocuments,
  getDocuments,
  deleteDocument,
};

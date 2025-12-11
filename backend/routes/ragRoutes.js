/**
 * RAG Routes
 * Routes for document upload and RAG querying
 */

const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {
  uploadDocument,
  queryDocuments,
  getDocuments,
  deleteDocument,
} = require('../controllers/ragController');

// Upload a PDF document
router.post('/upload', upload.single('document'), uploadDocument);

// Query documents using RAG
router.post('/query', queryDocuments);

// Get all uploaded documents
router.get('/documents', getDocuments);

// Delete a document
router.delete('/documents/:id', deleteDocument);

module.exports = router;

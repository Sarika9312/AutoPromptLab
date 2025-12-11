/**
 * Document Model
 * Stores uploaded PDF documents with embeddings for RAG
 */

const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  chunks: [{
    text: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number],
      required: true,
    },
    chunkIndex: {
      type: Number,
      required: true,
    },
  }],
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Document', documentSchema);

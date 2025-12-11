/**
 * Prompt Test Model
 * Stores prompt test results for analysis
 */

const mongoose = require('mongoose');

const promptTestSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  scores: {
    accuracy: Number,
    creativity: Number,
    coherence: Number,
  },
  latency: {
    type: Number, // in milliseconds
  },
  testedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PromptTest', promptTestSchema);

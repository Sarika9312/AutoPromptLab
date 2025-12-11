/**
 * Benchmark Model
 * Stores benchmark results for model comparison
 */

const mongoose = require('mongoose');

const benchmarkSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  metrics: {
    accuracy: {
      type: Number,
      required: true,
    },
    creativity: {
      type: Number,
      required: true,
    },
    coherence: {
      type: Number,
      required: true,
    },
    latency: {
      type: Number,
      required: true,
    },
  },
  testCount: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Benchmark', benchmarkSchema);

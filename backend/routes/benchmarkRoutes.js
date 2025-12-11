/**
 * Benchmark Routes
 * Routes for AI model benchmarking
 */

const express = require('express');
const router = express.Router();
const { getBenchmarkReport, compareModels } = require('../controllers/benchmarkController');

// Get benchmark report for all models
router.get('/report', getBenchmarkReport);

// Compare specific models
router.get('/compare', compareModels);

module.exports = router;

/**
 * Benchmark Controller
 * Handles AI model benchmarking
 */

const Benchmark = require('../models/Benchmark');
const PromptTest = require('../models/PromptTest');

/**
 * Get benchmark report for all models
 * @route GET /api/benchmark/report
 */
const getBenchmarkReport = async (req, res, next) => {
  try {
    // Aggregate statistics from PromptTest collection (Gemini only)
    const models = ['gemini'];
    const benchmarkData = [];
    
    for (const model of models) {
      // Get all tests for this model
      const tests = await PromptTest.find({ model });
      
      if (tests.length === 0) {
        // Return default values if no tests
        benchmarkData.push({
          model,
          metrics: {
            accuracy: 0,
            creativity: 0,
            coherence: 0,
            latency: 0,
          },
          testCount: 0,
          lastUpdated: new Date(),
        });
        continue;
      }
      
      // Calculate averages
      const avgAccuracy = tests.reduce((sum, t) => sum + (t.scores?.accuracy || 0), 0) / tests.length;
      const avgCreativity = tests.reduce((sum, t) => sum + (t.scores?.creativity || 0), 0) / tests.length;
      const avgCoherence = tests.reduce((sum, t) => sum + (t.scores?.coherence || 0), 0) / tests.length;
      const avgLatency = tests.reduce((sum, t) => sum + (t.latency || 0), 0) / tests.length;
      
      const metrics = {
        accuracy: Math.round(avgAccuracy),
        creativity: Math.round(avgCreativity),
        coherence: Math.round(avgCoherence),
        latency: Math.round(avgLatency),
      };
      
      // Update or create benchmark record
      await Benchmark.findOneAndUpdate(
        { model },
        { metrics, testCount: tests.length, lastUpdated: new Date() },
        { upsert: true, new: true }
      );
      
      benchmarkData.push({
        model,
        metrics,
        testCount: tests.length,
        lastUpdated: new Date(),
      });
    }
    
    res.json({
      success: true,
      data: benchmarkData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get detailed comparison for specific models
 * @route GET /api/benchmark/compare
 */
const compareModels = async (req, res, next) => {
  try {
    const { models } = req.query;
    const modelList = models ? models.split(',') : ['openai', 'gemini', 'claude'];
    
    const comparison = await Benchmark.find({ model: { $in: modelList } });
    
    res.json({
      success: true,
      data: comparison,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBenchmarkReport,
  compareModels,
};

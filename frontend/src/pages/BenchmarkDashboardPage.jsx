/**
 * BenchmarkDashboardPage
 * Compare AI model performance
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Target, Sparkles } from 'lucide-react';
import { benchmarkAPI } from '../services/api';
import { getModelName, getModelColor, formatLatency } from '../utils/helpers';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';
import Badge from '../components/ui/Badge';
import ScoreChart from '../components/charts/ScoreChart';
import BarChart from '../components/charts/BarChart';

const BenchmarkDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [benchmarkData, setBenchmarkData] = useState([]);
  
  useEffect(() => {
    fetchBenchmark();
  }, []);
  
  const fetchBenchmark = async () => {
    try {
      const response = await benchmarkAPI.getReport();
      setBenchmarkData(response.data);
    } catch (error) {
      console.error('Error fetching benchmark:', error);
      alert('Failed to fetch benchmark data');
    } finally {
      setLoading(false);
    }
  };
  
  // Prepare chart data
  const getChartData = () => {
    const data = {
      accuracy: {},
      creativity: {},
      coherence: {},
    };
    
    benchmarkData.forEach((benchmark) => {
      data.accuracy[benchmark.model] = benchmark.metrics.accuracy;
      data.creativity[benchmark.model] = benchmark.metrics.creativity;
      data.coherence[benchmark.model] = benchmark.metrics.coherence;
    });
    
    return data;
  };
  
  const getBarChartData = (metric) => {
    return benchmarkData.map((benchmark) => ({
      name: getModelName(benchmark.model),
      value: benchmark.metrics[metric],
    }));
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader text="Loading benchmark data..." />
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold gradient-text">Benchmark Dashboard</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Compare AI model performance across multiple metrics
        </p>
      </div>
      
      {/* Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benchmarkData.map((benchmark, index) => (
          <motion.div
            key={benchmark.model}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <div className="space-y-4">
                {/* Model Header */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getModelColor(benchmark.model)} flex items-center justify-center`}>
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800">
                      {getModelName(benchmark.model)}
                    </h3>
                    <Badge variant="gray" className="mt-1">
                      {benchmark.testCount} tests
                    </Badge>
                  </div>
                </div>
                
                {/* Metrics */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Target size={16} />
                      <span className="text-sm">Accuracy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                          style={{ width: `${benchmark.metrics.accuracy}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-800 w-10 text-right">
                        {benchmark.metrics.accuracy}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Sparkles size={16} />
                      <span className="text-sm">Creativity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all"
                          style={{ width: `${benchmark.metrics.creativity}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-800 w-10 text-right">
                        {benchmark.metrics.creativity}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <TrendingUp size={16} />
                      <span className="text-sm">Coherence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
                          style={{ width: `${benchmark.metrics.coherence}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-800 w-10 text-right">
                        {benchmark.metrics.coherence}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock size={16} />
                      <span className="text-sm">Latency</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {formatLatency(benchmark.metrics.latency)}
                    </span>
                  </div>
                </div>
                
                {/* Overall Score */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${getModelColor(benchmark.model)} bg-clip-text text-transparent`}>
                      {Math.round(
                        (benchmark.metrics.accuracy + 
                         benchmark.metrics.creativity + 
                         benchmark.metrics.coherence) / 3
                      )}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">Overall Score</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card title="Overall Comparison" subtitle="All metrics combined">
          <ScoreChart data={getChartData()} />
        </Card>
        
        {/* Bar Chart - Accuracy */}
        <Card title="Accuracy Comparison" subtitle="Higher is better">
          <BarChart data={getBarChartData('accuracy')} dataKey="value" xAxisKey="name" />
        </Card>
        
        {/* Bar Chart - Creativity */}
        <Card title="Creativity Comparison" subtitle="Higher is better">
          <BarChart data={getBarChartData('creativity')} dataKey="value" xAxisKey="name" />
        </Card>
        
        {/* Bar Chart - Latency */}
        <Card title="Latency Comparison" subtitle="Lower is better">
          <BarChart data={getBarChartData('latency')} dataKey="value" xAxisKey="name" />
        </Card>
      </div>
      
      {/* Summary */}
      <Card>
        <h3 className="text-xl font-bold text-slate-800 mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {benchmarkData.reduce((sum, b) => sum + b.testCount, 0)}
            </div>
            <div className="text-slate-600">Total Tests Run</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {benchmarkData.length}
            </div>
            <div className="text-slate-600">Models Compared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round(
                benchmarkData.reduce((sum, b) => 
                  sum + (b.metrics.accuracy + b.metrics.creativity + b.metrics.coherence) / 3, 0
                ) / benchmarkData.length
              )}
            </div>
            <div className="text-slate-600">Average Score</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BenchmarkDashboardPage;

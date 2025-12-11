/**
 * PromptTesterPage
 * Test prompts using Google Gemini (FREE)
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Copy, Check } from 'lucide-react';
import { promptAPI } from '../services/api';
import { getModelName, getModelColor, copyToClipboard, formatLatency } from '../utils/helpers';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Textarea from '../components/ui/Textarea';
import Loader from '../components/ui/Loader';
import Badge from '../components/ui/Badge';
import ScoreChart from '../components/charts/ScoreChart';

const PromptTesterPage = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [copiedModel, setCopiedModel] = useState(null);
  
  const promptTips = [
    'Be specific and clear in your instructions',
    'Provide context and examples when possible',
    'Use step-by-step reasoning for complex tasks',
    'Specify the desired output format',
  ];
  
  const handleTest = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const response = await promptAPI.test(prompt);
      setResults(response.data);
    } catch (error) {
      console.error('Error testing prompt:', error);
      alert('Failed to test prompt. Please check your API keys.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCopy = async (model, text) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedModel(model);
      setTimeout(() => setCopiedModel(null), 2000);
    }
  };
  
  // Prepare chart data
  const getChartData = () => {
    if (!results) return null;
    
    const data = {
      accuracy: {},
      creativity: {},
      coherence: {},
    };
    
    Object.entries(results).forEach(([model, response]) => {
      if (response.scores) {
        data.accuracy[model] = response.scores.accuracy;
        data.creativity[model] = response.scores.creativity;
        data.coherence[model] = response.scores.coherence;
      }
    });
    
    return data;
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold gradient-text">Prompt Tester</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Test your prompts using Google Gemini AI - 100% Free! 🎉
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <Textarea
              label="Enter Your Prompt"
              placeholder="Type your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
            />
            
            <div className="mt-4 flex justify-between items-center">
              <Badge variant="gray">
                {prompt.length} characters
              </Badge>
              <Button
                variant="primary"
                onClick={handleTest}
                disabled={loading || !prompt.trim()}
                icon={Send}
              >
                {loading ? 'Testing...' : 'Test Prompt'}
              </Button>
            </div>
          </Card>
          
          {/* Loading State */}
          {loading && (
            <Card className="text-center py-12">
              <Loader text="Testing across all models..." />
            </Card>
          )}
          
          {/* Results */}
          {results && !loading && (
            <div className="space-y-6">
              {Object.entries(results).map(([model, response]) => (
                <motion.div
                  key={model}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getModelColor(model)}`} />
                        <h3 className="text-xl font-bold text-slate-800">
                          {getModelName(model)}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="gray">
                          {formatLatency(response.latency)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(model, response.text)}
                          icon={copiedModel === model ? Check : Copy}
                        >
                          {copiedModel === model ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-slate-700 whitespace-pre-wrap mb-4">
                      {response.text}
                    </p>
                    
                    {response.scores && (
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {response.scores.accuracy}
                          </div>
                          <div className="text-sm text-slate-600">Accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {response.scores.creativity}
                          </div>
                          <div className="text-sm text-slate-600">Creativity</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {response.scores.coherence}
                          </div>
                          <div className="text-sm text-slate-600">Coherence</div>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Prompt Tips */}
          <Card icon={Sparkles} title="Prompt Tips" subtitle="Best practices">
            <ul className="space-y-3">
              {promptTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-700">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
          
          {/* Score Visualization */}
          {results && getChartData() && (
            <Card title="Score Comparison">
              <ScoreChart data={getChartData()} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptTesterPage;

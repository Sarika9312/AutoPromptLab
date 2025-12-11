/**
 * WorkflowGeneratorPage
 * Generate AI workflow diagrams and documentation
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Workflow, Copy, Download, Check, Lightbulb } from 'lucide-react';
import { workflowAPI } from '../services/api';
import { copyToClipboard, downloadAsFile } from '../utils/helpers';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Textarea from '../components/ui/Textarea';
import Loader from '../components/ui/Loader';
import Badge from '../components/ui/Badge';

const WorkflowGeneratorPage = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [workflow, setWorkflow] = useState(null);
  const [copied, setCopied] = useState(false);
  const [templates, setTemplates] = useState([]);
  
  // Load templates on mount
  React.useEffect(() => {
    fetchTemplates();
  }, []);
  
  const fetchTemplates = async () => {
    try {
      const response = await workflowAPI.getTemplates();
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };
  
  const handleGenerate = async () => {
    if (!taskDescription.trim()) return;
    
    setLoading(true);
    try {
      const response = await workflowAPI.generate(taskDescription);
      setWorkflow(response.data);
    } catch (error) {
      console.error('Error generating workflow:', error);
      alert('Failed to generate workflow. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCopy = async () => {
    if (!workflow) return;
    
    const success = await copyToClipboard(workflow.workflow.fullDocumentation);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleDownload = () => {
    if (!workflow) return;
    
    const filename = `workflow-${Date.now()}.txt`;
    downloadAsFile(workflow.workflow.fullDocumentation, filename);
  };
  
  const useTemplate = (template) => {
    setTaskDescription(template.description);
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold gradient-text">Workflow Generator</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Generate AI-powered workflow diagrams and documentation for any task
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input */}
          <Card>
            <Textarea
              label="Describe Your Task"
              placeholder="Example: Create a customer onboarding workflow for a SaaS product..."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows={6}
            />
            
            <div className="mt-4 flex justify-between items-center">
              <Badge variant="gray">
                {taskDescription.length} characters
              </Badge>
              <Button
                variant="primary"
                onClick={handleGenerate}
                disabled={loading || !taskDescription.trim()}
                icon={Workflow}
              >
                {loading ? 'Generating...' : 'Generate Workflow'}
              </Button>
            </div>
          </Card>
          
          {/* Loading */}
          {loading && (
            <Card className="text-center py-12">
              <Loader text="Generating workflow..." />
            </Card>
          )}
          
          {/* Workflow Result */}
          {workflow && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Steps Visualization */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Workflow Steps</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      icon={copied ? Check : Copy}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDownload}
                      icon={Download}
                    >
                      Download
                    </Button>
                  </div>
                </div>
                
                {workflow.workflow.steps && workflow.workflow.steps.length > 0 ? (
                  <div className="space-y-4">
                    {workflow.workflow.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8"
                      >
                        {/* Step Number */}
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        
                        {/* Connector Line */}
                        {index < workflow.workflow.steps.length - 1 && (
                          <div className="absolute left-4 top-8 w-0.5 h-full bg-gradient-to-b from-blue-300 to-transparent" />
                        )}
                        
                        {/* Step Content */}
                        <div className="glass rounded-lg p-4">
                          <h4 className="font-semibold text-slate-800">
                            {step.title}
                          </h4>
                          {step.description && (
                            <p className="text-sm text-slate-600 mt-2">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 text-center py-4">
                    No steps extracted. View full documentation below.
                  </p>
                )}
              </Card>
              
              {/* Full Documentation */}
              <Card>
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Complete Documentation
                </h3>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-slate-700 text-sm bg-slate-50 p-4 rounded-lg">
                    {workflow.workflow.fullDocumentation}
                  </pre>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Templates */}
          <Card icon={Lightbulb} title="Templates" subtitle="Quick start examples">
            <div className="space-y-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => useTemplate(template)}
                  className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <h4 className="font-medium text-slate-800 text-sm mb-1">
                    {template.name}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {template.description}
                  </p>
                  <Badge variant="gray" className="mt-2">
                    {template.category}
                  </Badge>
                </button>
              ))}
            </div>
          </Card>
          
          {/* Tips */}
          <Card title="Tips">
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Be specific about your goals and constraints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Include context about your industry or domain</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Mention key stakeholders or user groups</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Specify any tools or technologies you want to use</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkflowGeneratorPage;

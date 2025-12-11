/**
 * HomePage
 * Landing page with hero section and navigation
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, FileText, BarChart3, Workflow, Sparkles, Target, Rocket } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Zap,
      title: 'Prompt Testing',
      description: 'Test prompts across OpenAI, Gemini, and Claude simultaneously',
      path: '/prompt-tester',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: FileText,
      title: 'RAG Uploader',
      description: 'Upload PDFs and query them using advanced RAG techniques',
      path: '/rag-uploader',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: BarChart3,
      title: 'Benchmark Dashboard',
      description: 'Compare AI model performance with detailed metrics',
      path: '/benchmark',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Workflow,
      title: 'Workflow Generator',
      description: 'Generate AI-powered workflow diagrams and documentation',
      path: '/workflow',
      color: 'from-orange-500 to-red-600',
    },
  ];
  
  const stats = [
    { icon: Sparkles, label: 'AI Models', value: '3+' },
    { icon: Target, label: 'Accuracy', value: '95%' },
    { icon: Rocket, label: 'Speed', value: 'Fast' },
  ];
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-4">
            AutoPromptLab
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            Your complete AI testing and benchmarking platform. Test prompts, analyze performance, and build better AI workflows.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/prompt-tester')}
            icon={Zap}
          >
            Start Testing
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/benchmark')}
            icon={BarChart3}
          >
            View Benchmarks
          </Button>
        </motion.div>
      </section>
      
      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
                  <stat.icon className="text-white" size={32} />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
              <div className="text-slate-600">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </section>
      
      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to test, analyze, and optimize AI models in one platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                hover={true}
                onClick={() => navigate(feature.path)}
                className="h-full"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {feature.description}
                    </p>
                    <Button variant="outline" size="sm">
                      Explore →
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center py-12 glass rounded-2xl">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
          Join the future of AI testing and optimization
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/prompt-tester')}
          icon={Rocket}
        >
          Launch Platform
        </Button>
      </section>
    </div>
  );
};

export default HomePage;

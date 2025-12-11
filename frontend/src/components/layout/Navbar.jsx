/**
 * Navbar Component
 * Main navigation bar
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Zap, FileText, BarChart3, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/prompt-tester', label: 'Prompt Tester', icon: Zap },
    { path: '/rag-uploader', label: 'RAG Uploader', icon: FileText },
    { path: '/benchmark', label: 'Benchmark', icon: BarChart3 },
    { path: '/workflow', label: 'Workflow', icon: Workflow },
  ];
  
  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Zap className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold gradient-text">AutoPromptLab</span>
          </Link>
          
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-4 py-2 rounded-lg flex items-center gap-2 transition-all
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                        : 'text-slate-700 hover:bg-white/50'
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="font-medium hidden md:inline">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

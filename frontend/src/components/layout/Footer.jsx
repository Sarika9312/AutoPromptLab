/**
 * Footer Component
 * Page footer with links
 */

import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass mt-auto border-t border-white/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-600 flex items-center gap-2">
            Made with <Heart size={16} className="text-red-500 fill-current" /> using AI
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:your@email.com"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
          
          <div className="text-sm text-slate-600">
            © 2024 AutoPromptLab. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

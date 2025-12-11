/**
 * Loader Component
 * Beautiful loading animation
 */

import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <motion.div
          className={`${sizes[size]} border-4 border-blue-200 border-t-blue-600 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      {text && (
        <motion.p
          className="text-slate-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;

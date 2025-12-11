/**
 * Card Component
 * Reusable card with glassmorphism effect
 */

import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  onClick,
  title,
  subtitle,
  icon: Icon,
}) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -4, shadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      className={`
        glass rounded-xl p-6 transition-all
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {(title || Icon) && (
        <div className="flex items-start gap-4 mb-4">
          {Icon && (
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <Icon className="text-white" size={24} />
            </div>
          )}
          <div className="flex-1">
            {title && <h3 className="text-xl font-bold text-slate-800">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default Card;

/**
 * Button Component
 * Reusable button with variants
 */

import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  icon: Icon,
}) => {
  const baseStyles = 'rounded-lg font-medium transition-all inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg border border-slate-200',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-slate-700 hover:bg-slate-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
    >
      {Icon && <Icon size={20} />}
      {children}
    </motion.button>
  );
};

export default Button;

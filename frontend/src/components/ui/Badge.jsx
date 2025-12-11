/**
 * Badge Component
 * Small badge for labels and tags
 */

import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    gray: 'bg-slate-100 text-slate-700',
  };
  
  return (
    <span className={`
      inline-block px-3 py-1 rounded-full text-xs font-semibold
      ${variants[variant]}
      ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;

/**
 * Textarea Component
 * Styled textarea field
 */

import React from 'react';

const Textarea = ({
  placeholder,
  value,
  onChange,
  className = '',
  label,
  error,
  rows = 4,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-lg border border-slate-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all bg-white/50 backdrop-blur-sm resize-none
          ${error ? 'border-red-500' : ''}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Textarea;

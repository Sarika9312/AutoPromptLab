/**
 * Input Component
 * Styled input field
 */

import React from 'react';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  label,
  error,
  icon: Icon,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 rounded-lg border border-slate-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all bg-white/50 backdrop-blur-sm
            ${Icon ? 'pl-12' : ''}
            ${error ? 'border-red-500' : ''}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;

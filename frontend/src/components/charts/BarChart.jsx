/**
 * BarChart Component
 * Bar chart for benchmark comparison
 */

import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChart = ({ data, dataKey, xAxisKey = 'name' }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey={xAxisKey} tick={{ fill: '#475569' }} />
        <YAxis tick={{ fill: '#475569' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        />
        <Legend />
        <Bar dataKey={dataKey} fill="#3b82f6" radius={[8, 8, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;

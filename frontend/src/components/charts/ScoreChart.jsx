/**
 * ScoreChart Component
 * Radar chart for displaying model scores
 */

import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const ScoreChart = ({ data, models = ['openai', 'gemini', 'claude'] }) => {
  // Transform data for radar chart
  const chartData = [
    { metric: 'Accuracy', ...data.accuracy },
    { metric: 'Creativity', ...data.creativity },
    { metric: 'Coherence', ...data.coherence },
  ];
  
  const colors = {
    openai: '#10b981',
    gemini: '#3b82f6',
    claude: '#a855f7',
  };
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={chartData}>
        <PolarGrid stroke="#cbd5e1" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: '#475569', fontSize: 14 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
        
        {models.map((model) => (
          <Radar
            key={model}
            name={model.charAt(0).toUpperCase() + model.slice(1)}
            dataKey={model}
            stroke={colors[model]}
            fill={colors[model]}
            fillOpacity={0.3}
          />
        ))}
        
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default ScoreChart;

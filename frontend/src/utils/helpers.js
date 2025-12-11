/**
 * Utility Functions
 * Helper functions for the application
 */

/**
 * Format timestamp to readable date
 */
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get color for score
 */
export const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * Get background color for score
 */
export const getScoreBgColor = (score) => {
  if (score >= 80) return 'bg-green-100';
  if (score >= 60) return 'bg-yellow-100';
  return 'bg-red-100';
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Download text as file
 */
export const downloadAsFile = (content, filename) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Format latency in ms
 */
export const formatLatency = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

/**
 * Get model display name
 */
export const getModelName = (model) => {
  const names = {
    openai: 'OpenAI GPT',
    gemini: 'Google Gemini',
    claude: 'Anthropic Claude',
  };
  return names[model] || model;
};

/**
 * Get model color
 */
export const getModelColor = (model) => {
  const colors = {
    openai: 'from-green-500 to-emerald-600',
    gemini: 'from-blue-500 to-indigo-600',
    claude: 'from-purple-500 to-pink-600',
  };
  return colors[model] || 'from-gray-500 to-gray-600';
};

// Weather utility functions

export const getBackgroundGradient = (weatherData) => {
  if (!weatherData) return 'from-blue-400 to-blue-600';
  
  const condition = weatherData.current.condition.text.toLowerCase();
  const isDay = weatherData.current.condition.icon.includes('day');
  
  if (condition.includes('rain')) return 'from-gray-500 to-gray-700';
  if (condition.includes('snow')) return 'from-blue-300 to-blue-500';
  if (condition.includes('cloud')) return 'from-gray-400 to-gray-600';
  if (isDay) return 'from-blue-400 to-blue-600';
  return 'from-indigo-600 to-purple-700';
};

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateTimeStr) => {
  return new Date(dateTimeStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const convertTemperature = (temp, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'C' && toUnit === 'F') {
    return (temp * 9/5) + 32;
  }
  
  if (fromUnit === 'F' && toUnit === 'C') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
};

export const getWeatherConditionColor = (condition) => {
  const lower = condition.toLowerCase();
  
  if (lower.includes('rain')) return 'text-blue-400';
  if (lower.includes('snow')) return 'text-blue-200';
  if (lower.includes('thunder')) return 'text-yellow-400';
  if (lower.includes('cloud')) return 'text-gray-300';
  if (lower.includes('sun') || lower.includes('clear')) return 'text-yellow-300';
  
  return 'text-white';
};
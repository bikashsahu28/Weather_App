import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  CloudDrizzle,
  Snowflake,
  CloudLightning,
  Cloudy,
  Moon,
  Stars
} from 'lucide-react';

const WeatherIcon = ({ condition, size = 'medium', animated = true }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'w-5 h-5';
      case 'medium': return 'w-8 h-8';
      case 'large': return 'w-12 h-12';
      case 'xl': return 'w-16 h-16';
      default: return 'w-8 h-8';
    }
  };

  const getWeatherIcon = (condition) => {
    const lower = condition.toLowerCase();
    const sizeClass = getSizeClass();
    const animationClass = animated ? 'transition-all duration-300 hover:scale-110' : '';
    
    // Rain conditions
    if (lower.includes('rain') || lower.includes('shower')) {
      return <CloudRain className={`${sizeClass} ${animationClass} text-blue-400`} />;
    }
    
    // Drizzle conditions
    if (lower.includes('drizzle') || lower.includes('mist')) {
      return <CloudDrizzle className={`${sizeClass} ${animationClass} text-blue-300`} />;
    }
    
    // Snow conditions
    if (lower.includes('snow') || lower.includes('blizzard') || lower.includes('sleet')) {
      return <CloudSnow className={`${sizeClass} ${animationClass} text-blue-200`} />;
    }
    
    // Thunder/Storm conditions
    if (lower.includes('thunder') || lower.includes('storm')) {
      return <CloudLightning className={`${sizeClass} ${animationClass} text-purple-400`} />;
    }
    
    // Cloud conditions
    if (lower.includes('cloud') || lower.includes('overcast')) {
      return <Cloud className={`${sizeClass} ${animationClass} text-gray-300`} />;
    }
    
    // Partly cloudy
    if (lower.includes('partly')) {
      return <Cloudy className={`${sizeClass} ${animationClass} text-gray-200`} />;
    }
    
    // Clear night
    if (lower.includes('clear') && lower.includes('night')) {
      return <Moon className={`${sizeClass} ${animationClass} text-blue-200`} />;
    }
    
    // Sunny/Clear day
    if (lower.includes('sun') || lower.includes('clear') || lower.includes('bright')) {
      return <Sun className={`${sizeClass} ${animationClass} text-yellow-400`} />;
    }
    
    // Fog/Haze
    if (lower.includes('fog') || lower.includes('haze')) {
      return <Cloud className={`${sizeClass} ${animationClass} text-gray-400 opacity-70`} />;
    }
    
    // Default sunny
    return <Sun className={`${sizeClass} ${animationClass} text-yellow-400`} />;
  };

  return (
    <div className="flex items-center justify-center">
      {getWeatherIcon(condition)}
    </div>
  );
};

export default WeatherIcon;
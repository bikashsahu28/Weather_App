import React from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="text-center text-white mb-12">
      <div className="relative mx-auto mb-8 w-24 h-24">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-white border-opacity-20"></div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white border-r-white animate-spin"></div>
        
        {/* Inner animated icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <Cloud className="w-8 h-8 text-blue-200 animate-pulse" />
            <div className="absolute -top-1 -right-1">
              <Sun className="w-4 h-4 text-yellow-300 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Fetching Weather Data</h3>
        <p className="text-blue-200 font-light">Getting the latest forecast information...</p>
        
        {/* Loading dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
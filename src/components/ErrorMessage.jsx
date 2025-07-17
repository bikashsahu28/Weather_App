import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur opacity-20"></div>
        
        <div className="relative bg-red-500 bg-opacity-10 backdrop-blur-xl border border-red-400 border-opacity-30 text-white p-6 rounded-2xl shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-100 mb-1">
                Weather Data Unavailable
              </h3>
              <p className="text-red-200 text-sm font-light">
                {message}
              </p>
            </div>
          </div>
          
          {onRetry && (
            <div className="mt-4 pt-4 border-t border-red-400 border-opacity-20">
              <button
                onClick={onRetry}
                className="flex items-center space-x-2 text-red-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
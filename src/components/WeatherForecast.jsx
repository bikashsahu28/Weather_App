import React from 'react';
import WeatherIcon from './WeatherIcon.jsx';
import { CloudRain, Wind, Droplets } from 'lucide-react';

const WeatherForecast = ({ forecastData, selectedUnit, onDaySelect, selectedDate }) => {
  // Format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFullDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white from-opacity-5 to-white to-opacity-2 backdrop-blur-xl rounded-3xl"></div>
      
      <div className="relative bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold text-white">5-Day Forecast</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecastData.map((day, index) => (
            <div 
              key={index} 
              className={`group relative bg-white rounded-2xl p-6 text-center text-white transition-all duration-300 hover:scale-105 hover:shadow-xl border backdrop-blur-sm cursor-pointer ${
                selectedDate && selectedDate.toDateString() === new Date(day.date).toDateString()
                  ? 'bg-opacity-20 border-blue-400 border-opacity-50 shadow-lg'
                  : 'bg-opacity-5 hover:bg-opacity-10 border-white border-opacity-10'
              }`}
              onClick={() => onDaySelect && onDaySelect(new Date(day.date), day)}
            >
              {/* Hover effect background */}
              <div className={`absolute inset-0 bg-gradient-to-br rounded-2xl transition-all duration-300 ${
                selectedDate && selectedDate.toDateString() === new Date(day.date).toDateString()
                  ? 'from-blue-400 from-opacity-10 to-purple-400 to-opacity-5'
                  : 'from-blue-400 from-opacity-0 to-purple-400 to-opacity-0 group-hover:from-opacity-10 group-hover:to-opacity-5'
              }`}></div>
              
              <div className="relative z-10">
                {/* Date */}
                <div className="mb-4">
                  <p className="font-bold text-lg">
                    {index === 0 ? 'Today' : formatDate(day.date)}
                  </p>
                  <p className="text-blue-200 text-xs font-light">
                    {formatFullDate(day.date)}
                  </p>
                </div>

                {/* Weather Icon */}
                <div className="mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <WeatherIcon condition={day.day.condition.text} size="large" />
                </div>

                {/* Condition */}
                <p className="text-sm mb-4 font-medium text-blue-100 min-h-[2.5rem] flex items-center justify-center">
                  {day.day.condition.text}
                </p>

                {/* Temperature */}
                <div className="flex justify-center items-center space-x-3 mb-4">
                  <span className="text-2xl font-bold">
                    {selectedUnit === 'C' ? Math.round(day.day.maxtemp_c) : Math.round(day.day.maxtemp_f)}°
                  </span>
                  <span className="text-blue-300 text-lg">
                    {selectedUnit === 'C' ? Math.round(day.day.mintemp_c) : Math.round(day.day.mintemp_f)}°
                  </span>
                </div>

                {/* Additional Details */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-center space-x-2 text-blue-200">
                    <CloudRain className="w-3 h-3" />
                    <span>{day.day.chance_of_rain}% rain</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-blue-200">
                    <Wind className="w-3 h-3" />
                    <span>{Math.round(day.day.maxwind_kph)} km/h</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-blue-200">
                    <Droplets className="w-3 h-3" />
                    <span>{day.day.avghumidity}%</span>
                  </div>
                </div>

                {/* UV Index indicator */}
                <div className="mt-3 pt-3 border-t border-white border-opacity-10">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-xs text-blue-200">UV</span>
                    <div className={`w-2 h-2 rounded-full ${
                      day.day.uv <= 2 ? 'bg-green-400' :
                      day.day.uv <= 5 ? 'bg-yellow-400' :
                      day.day.uv <= 7 ? 'bg-orange-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-xs font-medium">{day.day.uv}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional forecast info */}
        <div className="mt-8 pt-6 border-t border-white border-opacity-10">
          <p className="text-center text-blue-200 text-sm font-light">
            Click any day for detailed hourly forecast • Data updates every hour
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
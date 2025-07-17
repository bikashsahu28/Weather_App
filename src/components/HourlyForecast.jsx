import React from 'react';
import { Clock, Thermometer, Wind, Droplets, Eye, CloudRain } from 'lucide-react';
import WeatherIcon from './WeatherIcon.jsx';

const HourlyForecast = ({ hourlyData, selectedUnit, selectedDate }) => {
  const formatTime = (timeStr) => {
    return new Date(timeStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 30) return 'text-red-400';
    if (temp >= 20) return 'text-orange-400';
    if (temp >= 10) return 'text-yellow-400';
    if (temp >= 0) return 'text-blue-400';
    return 'text-blue-200';
  };

  const getRainChanceColor = (chance) => {
    if (chance >= 70) return 'text-blue-400';
    if (chance >= 40) return 'text-blue-300';
    if (chance >= 20) return 'text-blue-200';
    return 'text-gray-400';
  };

  if (!hourlyData || hourlyData.length === 0) {
    return (
      <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20 shadow-2xl text-white text-center">
        <Clock className="w-12 h-12 text-blue-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">No Hourly Data Available</h3>
        <p className="text-blue-200">Select a date to view hourly forecast</p>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 border border-white border-opacity-20 shadow-2xl text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-blue-300" />
          <div>
            <h3 className="text-xl font-bold">Hourly Forecast</h3>
            <p className="text-blue-200 text-sm">
              {selectedDate ? formatDate(selectedDate) : 'Today'}
            </p>
          </div>
        </div>
        <div className="text-xs text-blue-200 bg-white bg-opacity-5 px-3 py-1 rounded-full">
          Updates every hour
        </div>
      </div>

      {/* Hourly forecast grid */}
      <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="group bg-white bg-opacity-5 hover:bg-opacity-10 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] border border-white border-opacity-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
              {/* Time */}
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-300" />
                <span className="font-medium">{formatTime(hour.time)}</span>
              </div>

              {/* Weather Icon & Condition */}
              <div className="flex items-center space-x-3">
                <WeatherIcon condition={hour.condition.text} size="small" />
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{hour.condition.text}</p>
                </div>
              </div>

              {/* Temperature */}
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-blue-300" />
                <span className={`text-lg font-bold ${getTemperatureColor(selectedUnit === 'C' ? hour.temp_c : hour.temp_f)}`}>
                  {selectedUnit === 'C' ? Math.round(hour.temp_c) : Math.round(hour.temp_f)}°
                </span>
              </div>

              {/* Rain Chance */}
              <div className="flex items-center space-x-2">
                <CloudRain className="w-4 h-4 text-blue-300" />
                <span className={`text-sm font-medium ${getRainChanceColor(hour.chance_of_rain)}`}>
                  {hour.chance_of_rain}%
                </span>
              </div>

              {/* Wind */}
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-blue-300" />
                <span className="text-sm">{Math.round(hour.wind_kph)} km/h</span>
              </div>

              {/* Humidity */}
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-blue-300" />
                <span className="text-sm">{hour.humidity}%</span>
              </div>
            </div>

            {/* Additional details (visible on hover) */}
            <div className="mt-3 pt-3 border-t border-white border-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-blue-200">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>Visibility: {hour.vis_km}km</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>💨</span>
                  <span>Feels like: {selectedUnit === 'C' ? Math.round(hour.feelslike_c) : Math.round(hour.feelslike_f)}°</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>🌡️</span>
                  <span>Heat Index: {selectedUnit === 'C' ? Math.round(hour.heatindex_c) : Math.round(hour.heatindex_f)}°</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>💧</span>
                  <span>Precip: {hour.precip_mm}mm</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white border-opacity-10 text-center">
        <p className="text-blue-200 text-xs">
          Scroll to view more hours • Hover over any hour for additional details
        </p>
      </div>
    </div>
  );
};

export default HourlyForecast;
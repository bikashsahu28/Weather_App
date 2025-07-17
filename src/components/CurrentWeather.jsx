import React from 'react';
import { Wind, Eye, Droplets, Sun, Thermometer, Gauge, CloudRain, Navigation } from 'lucide-react';
import WeatherIcon from './WeatherIcon.jsx';

const CurrentWeather = ({ weatherData, selectedUnit, setSelectedUnit }) => {
  const getAirQualityColor = (aqi) => {
    if (aqi <= 50) return 'text-green-400';
    if (aqi <= 100) return 'text-yellow-400';
    if (aqi <= 150) return 'text-orange-400';
    return 'text-red-400';
  };

  const getAirQualityText = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    return 'Unhealthy';
  };

  const getUVIndexColor = (uv) => {
    if (uv <= 2) return 'text-green-400';
    if (uv <= 5) return 'text-yellow-400';
    if (uv <= 7) return 'text-orange-400';
    if (uv <= 10) return 'text-red-400';
    return 'text-purple-400';
  };

  return (
    <div className="relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white from-opacity-10 to-white to-opacity-5 backdrop-blur-xl rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 from-opacity-10 to-purple-400 to-opacity-10 rounded-3xl"></div>
      
      <div className="relative bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">{weatherData.location.name}</h2>
            <p className="text-blue-100 text-lg font-light">
              {weatherData.location.region}, {weatherData.location.country}
            </p>
            <p className="text-blue-200 text-sm font-light mt-1">
              {new Date(weatherData.location.localtime).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          {/* Unit Toggle */}
          <div className="flex items-center space-x-1 bg-white bg-opacity-10 rounded-full p-1 backdrop-blur-sm">
            <button
              onClick={() => setSelectedUnit('C')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedUnit === 'C' 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setSelectedUnit('F')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedUnit === 'F' 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              °F
            </button>
          </div>
        </div>

        {/* Main Weather Display */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-6">
            <div className="text-8xl font-light">
              {selectedUnit === 'C' ? Math.round(weatherData.current.temp_c) : Math.round(weatherData.current.temp_f)}°
            </div>
            <div className="text-blue-100">
              <WeatherIcon condition={weatherData.current.condition.text} size="large" />
              <p className="mt-3 text-xl font-medium">{weatherData.current.condition.text}</p>
              <p className="text-sm font-light">
                Feels like {selectedUnit === 'C' ? Math.round(weatherData.current.feelslike_c) : Math.round(weatherData.current.feelslike_f)}°
              </p>
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Wind */}
          <div className="bg-white bg-opacity-5 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-10">
            <div className="flex items-center space-x-3 mb-2">
              <Wind className="w-6 h-6 text-blue-300" />
              <span className="text-sm text-blue-200 font-medium">Wind</span>
            </div>
            <p className="text-2xl font-bold">{weatherData.current.wind_kph}</p>
            <p className="text-xs text-blue-200">km/h {weatherData.current.wind_dir}</p>
          </div>

          {/* Humidity */}
          <div className="bg-white bg-opacity-5 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-10">
            <div className="flex items-center space-x-3 mb-2">
              <Droplets className="w-6 h-6 text-blue-300" />
              <span className="text-sm text-blue-200 font-medium">Humidity</span>
            </div>
            <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
            <p className="text-xs text-blue-200">Relative</p>
          </div>

          {/* Visibility */}
          <div className="bg-white bg-opacity-5 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-10">
            <div className="flex items-center space-x-3 mb-2">
              <Eye className="w-6 h-6 text-blue-300" />
              <span className="text-sm text-blue-200 font-medium">Visibility</span>
            </div>
            <p className="text-2xl font-bold">{weatherData.current.vis_km}</p>
            <p className="text-xs text-blue-200">km</p>
          </div>

          {/* UV Index */}
          <div className="bg-white bg-opacity-5 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-10">
            <div className="flex items-center space-x-3 mb-2">
              <Sun className="w-6 h-6 text-blue-300" />
              <span className="text-sm text-blue-200 font-medium">UV Index</span>
            </div>
            <p className={`text-2xl font-bold ${getUVIndexColor(weatherData.current.uv)}`}>
              {weatherData.current.uv}
            </p>
            <p className="text-xs text-blue-200">
              {weatherData.current.uv <= 2 ? 'Low' : 
               weatherData.current.uv <= 5 ? 'Moderate' : 
               weatherData.current.uv <= 7 ? 'High' : 'Very High'}
            </p>
          </div>

          {/* Pressure */}
          <div className="bg-white bg-opacity-5 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-10">
            <div className="flex items-center space-x-3 mb-2">
              <Gauge className="w-6 h-6 text-blue-300" />
              <span className="text-sm text-blue-200 font-medium">Pressure</span>
            </div>
            <p className="text-2xl font-bold">{weatherData.current.pressure_mb}</p>
            <p className="text-xs text-blue-200">mb</p>
          </div>

          {/* Precipitation */}
          <div className="bg-white bg-opacity-5 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-10">
            <div className="flex items-center space-x-3 mb-2">
              <CloudRain className="w-6 h-6 text-blue-300" />
              <span className="text-sm text-blue-200 font-medium">Precipitation</span>
            </div>
            <p className="text-2xl font-bold">{weatherData.current.precip_mm}</p>
            <p className="text-xs text-blue-200">mm</p>
          </div>

          {/* Cloud Cover */}
          <div className="bg-white bg-opacity-5 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-10">
            <div className="flex items-center space-x-3 mb-2">
              <Navigation className="w-6 h-6 text-blue-300" />
              <span className="text-sm text-blue-200 font-medium">Cloud Cover</span>
            </div>
            <p className="text-2xl font-bold">{weatherData.current.cloud}%</p>
            <p className="text-xs text-blue-200">Coverage</p>
          </div>

          {/* Air Quality */}
          {weatherData.current.air_quality && (
            <div className="bg-white bg-opacity-5 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-10">
              <div className="flex items-center space-x-3 mb-2">
                <Thermometer className="w-6 h-6 text-blue-300" />
                <span className="text-sm text-blue-200 font-medium">Air Quality</span>
              </div>
              <p className={`text-2xl font-bold ${getAirQualityColor(weatherData.current.air_quality['us-epa-index'])}`}>
                {weatherData.current.air_quality['us-epa-index']}
              </p>
              <p className="text-xs text-blue-200">
                {getAirQualityText(weatherData.current.air_quality['us-epa-index'])}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
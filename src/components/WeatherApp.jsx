import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.jsx';
import CurrentWeather from './CurrentWeather.jsx';
import WeatherForecast from './WeatherForecast.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import { Cloud, Sun, Moon, CloudRain } from 'lucide-react';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('C');

  const API_KEY = 'b763c6d2020f4f5ca7645813251707';
  const BASE_URL = 'https://api.weatherapi.com/v1';

  // Fetch weather data
  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=5&aqi=yes`);
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Get background gradient based on weather and time
  const getBackgroundGradient = () => {
    if (!weatherData) return 'from-slate-900 via-blue-900 to-indigo-900';
    
    const condition = weatherData.current.condition.text.toLowerCase();
    const isDay = weatherData.current.is_day === 1;
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return isDay ? 'from-slate-600 via-slate-700 to-slate-800' : 'from-slate-800 via-slate-900 to-black';
    }
    if (condition.includes('snow') || condition.includes('blizzard')) {
      return isDay ? 'from-blue-200 via-blue-300 to-blue-400' : 'from-blue-900 via-indigo-900 to-slate-900';
    }
    if (condition.includes('cloud') || condition.includes('overcast')) {
      return isDay ? 'from-gray-400 via-gray-500 to-gray-600' : 'from-gray-700 via-gray-800 to-gray-900';
    }
    if (condition.includes('thunder') || condition.includes('storm')) {
      return 'from-purple-900 via-indigo-900 to-slate-900';
    }
    if (isDay) {
      return 'from-blue-400 via-blue-500 to-blue-600';
    }
    return 'from-slate-900 via-purple-900 to-indigo-900';
  };

  // Get current location weather on load
  useEffect(() => {
    fetchWeatherData('Bhubaneswar');
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white bg-opacity-3 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white bg-opacity-2 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            {weatherData ? (
              weatherData.current.is_day === 1 ? (
                <Sun className="w-12 h-12 text-yellow-300 mr-4" />
              ) : (
                <Moon className="w-12 h-12 text-blue-200 mr-4" />
              )
            ) : (
              <Cloud className="w-12 h-12 text-white mr-4" />
            )}
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Weather<span className="text-blue-300">Pro</span>
            </h1>
          </div>
          <p className="text-blue-100 text-lg font-light max-w-2xl mx-auto">
            Professional weather forecasting with real-time data and extended predictions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Search Section */}
        <SearchBar onLocationSelect={fetchWeatherData} />

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Weather Data */}
        {weatherData && !loading && (
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Current Weather */}
            <CurrentWeather 
              weatherData={weatherData}
              selectedUnit={selectedUnit}
              setSelectedUnit={setSelectedUnit}
            />

            {/* 5-Day Forecast */}
            <WeatherForecast 
              forecastData={weatherData.forecast.forecastday}
              selectedUnit={selectedUnit}
            />

            {/* Footer */}
            <div className="text-center pt-8 pb-4">
              <p className="text-blue-200 text-sm font-light">
                Powered by WeatherAPI • Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
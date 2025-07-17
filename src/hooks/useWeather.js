import { useState, useEffect } from 'react';
import { weatherService } from '../services/weatherService.js';

export const useWeather = (initialLocation = 'London') => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await weatherService.getWeatherForecast(location);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialLocation) {
      fetchWeatherData(initialLocation);
    }
  }, [initialLocation]);

  return {
    weatherData,
    loading,
    error,
    fetchWeatherData,
    refetch: () => fetchWeatherData(weatherData?.location?.name || initialLocation)
  };
};

export default useWeather;
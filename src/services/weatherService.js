// Weather API service

const API_KEY = 'b763c6d2020f4f5ca7645813251707';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const weatherService = {
  // Search for location suggestions
  searchLocations: async (query) => {
    if (query.length < 3) return [];

    try {
      const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        return data.slice(0, 5);
      }
      return [];
    } catch (error) {
      console.error('Error searching locations:', error);
      return [];
    }
  },

  // Get current weather data
  getCurrentWeather: async (location) => {
    try {
      const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`);
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch current weather data');
    }
  },

  // Get weather forecast
  getWeatherForecast: async (location, days = 7) => {
    try {
      const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=yes&alerts=yes`);
      
      if (!response.ok) {
        throw new Error('Weather forecast not found');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch weather forecast');
    }
  },

  // Get hourly forecast for specific date
  getHourlyForecast: async (location, date) => {
    try {
      const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&dt=${date}&aqi=no`);
      
      if (!response.ok) {
        throw new Error('Hourly forecast not found');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch hourly forecast');
    }
  },

  // Get historical weather data
  getHistoricalWeather: async (location, date) => {
    try {
      const response = await fetch(`${BASE_URL}/history.json?key=${API_KEY}&q=${encodeURIComponent(location)}&dt=${date}`);
      
      if (!response.ok) {
        throw new Error('Historical weather data not found');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch historical weather data');
    }
  }
};

export default weatherService;
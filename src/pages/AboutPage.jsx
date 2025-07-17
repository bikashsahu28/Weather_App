import React from 'react';
import { Cloud, MapPin, Thermometer, Eye } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Cloud className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">About Weather App</h1>
            <p className="text-blue-100 text-lg">
              Your reliable companion for accurate weather forecasting
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-200 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Location Search</h3>
                  <p className="text-blue-100 text-sm">
                    Search for any city worldwide with intelligent autocomplete suggestions
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Thermometer className="w-6 h-6 text-blue-200 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Current Weather</h3>
                  <p className="text-blue-100 text-sm">
                    Real-time weather data including temperature, humidity, wind speed, and more
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Cloud className="w-6 h-6 text-blue-200 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">5-Day Forecast</h3>
                  <p className="text-blue-100 text-sm">
                    Extended weather forecast to help you plan your week ahead
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Eye className="w-6 h-6 text-blue-200 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Detailed Metrics</h3>
                  <p className="text-blue-100 text-sm">
                    Comprehensive weather details including UV index, visibility, and air pressure
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Section */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">R</span>
                </div>
                <h3 className="font-semibold mb-2">React</h3>
                <p className="text-blue-100 text-sm">
                  Built with React for a smooth, interactive user experience
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">JS</span>
                </div>
                <h3 className="font-semibold mb-2">JavaScript</h3>
                <p className="text-blue-100 text-sm">
                  Pure JavaScript for optimal performance and compatibility
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">API</span>
                </div>
                <h3 className="font-semibold mb-2">WeatherAPI</h3>
                <p className="text-blue-100 text-sm">
                  Powered by reliable weather data from WeatherAPI service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
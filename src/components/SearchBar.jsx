import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

const SearchBar = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const API_KEY = 'b763c6d2020f4f5ca7645813251707';
  const BASE_URL = 'https://api.weatherapi.com/v1';

  // Search for location suggestions
  const searchLocations = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.slice(0, 5));
        setShowSuggestions(true);
      }
    } catch (err) {
      console.error('Error searching locations:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    const fullLocation = `${location.name}, ${location.region}, ${location.country}`;
    setSearchQuery(fullLocation);
    setShowSuggestions(false);
    onLocationSelect(fullLocation);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      onLocationSelect(searchQuery);
    }
  };

  // Handle search input changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 3) {
        searchLocations(searchQuery);
      } else {
        setShowSuggestions(false);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="max-w-2xl mx-auto mb-12 relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl border border-white border-opacity-20 shadow-2xl">
            <div className="flex items-center">
              <Search className="absolute left-6 text-blue-200 w-6 h-6" />
              {isSearching && (
                <Loader2 className="absolute right-6 text-blue-200 w-5 h-5 animate-spin" />
              )}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for any city worldwide..."
                className="w-full pl-16 pr-16 py-6 bg-transparent text-white placeholder-blue-200 text-lg font-light focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-2xl"
              />
            </div>
          </div>
        </div>
        
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white border-opacity-30 overflow-hidden z-20">
            {suggestions.map((location, index) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className="w-full text-left px-6 py-4 hover:bg-blue-50 hover:bg-opacity-50 flex items-center space-x-4 border-b border-gray-100 border-opacity-30 last:border-b-0 transition-all duration-200 group"
              >
                <MapPin className="w-5 h-5 text-blue-500 group-hover:text-blue-600" />
                <div>
                  <span className="text-gray-800 font-medium text-lg">
                    {location.name}
                  </span>
                  <p className="text-gray-600 text-sm">
                    {location.region}, {location.country}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
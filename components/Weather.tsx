"use client";
import React, { useEffect, useState } from 'react';
import { fetchWeather } from '@/utils/weatherApi';
import cloudy from "../public/cloudy.png"
import Image from 'next/image';

const Weather: React.FC<{ cityName: string }> = ({ cityName }) => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    console.log('City name:', cityName);
    const getWeather = async () => {
      try {
        const data = await fetchWeather(cityName);
        console.log('Fetched weather data:', data);
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    getWeather();
  }, [cityName]);

  if (!weather) return <p>Loading...</p>;

  // Select appropriate weather icon based on weather description

  return (
    <div className="max-w-xs mt-[20%] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
      <div className="p-6 ">
        <div className="flex items-center mb-4">
          <Image
            src={cloudy}
            alt={weather.weather[0]?.description}
            className="w-16 h-16 mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{weather.name}</h2>
            <p className="text-gray-600 mb-4 text-lg">{weather.weather[0]?.description || 'No description available'}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="text-lg font-medium text-gray-700">Temperature:</span>
            <span className="ml-2 text-xl font-semibold text-gray-900">{weather.main?.temp}°C</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="text-lg font-medium text-gray-700">Humidity:</span>
            <span className="ml-2 text-xl font-semibold text-gray-900">{weather.main?.humidity}%</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-700">Wind Speed:</span>
            <span className="ml-2 text-xl font-semibold text-gray-900">{weather.wind?.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

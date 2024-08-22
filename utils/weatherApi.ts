// utils/weatherApi.ts
import axios from 'axios';

const API_KEY = '';

export const fetchWeather = async (cityName: string) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${`3fda677a1679977d779794c52d781f1b`}&units=metric`
  );
  return response.data;
};

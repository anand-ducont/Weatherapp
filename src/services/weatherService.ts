import axios from 'axios';

export const fetchWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
    );
    return response?.data;
  } catch (error) {
    // throw new Error('Failed to fetch weather from Open-Meteo');
  }
};

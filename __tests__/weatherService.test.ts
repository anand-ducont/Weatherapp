import axios from 'axios';
import { fetchWeather } from '../src/services/weatherService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchWeather', () => {
  it('should fetch weather data successfully', async () => {
    const mockData = {
      hourly: {
        temperature_2m: [30.5],
        time: ['2025-06-27T12:00'],
      },
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await fetchWeather(13, 80.25);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('latitude=13')
    );

    expect(result.hourly.temperature_2m[0]).toBe(30.5);
    expect(result.hourly.time[0]).toBe('2025-06-27T12:00');
  });
});

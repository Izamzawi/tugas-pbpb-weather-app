export interface WeatherData {
  time: string[];
  temperature_2m: number[];
}

export interface ForecastResponse {
  hourly: WeatherData;
}

export const fetchWeatherData = async (
  latitude: number,
  longitude: number
): Promise<ForecastResponse> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ForecastResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

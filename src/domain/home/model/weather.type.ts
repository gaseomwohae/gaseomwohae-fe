export type LocationWeather = {
  location: string;
  weather: Weather[];
};

export type Weather = {
  weather: string;
  minTemp: number;
  maxTemp: number;
  dayOfWeek: string;
};

export type LocationWeather = {
  location: string;
  weather: Weather[];
};

export type Weather = {
  weather: string;
  temperature: string;
  dayOfWeek: string;
};

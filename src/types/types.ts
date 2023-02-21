import { string } from 'yargs';

export type cityDataMain = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

export type cityDataWeather = {
  description: string;
  icon: string;
  main: string;
};

export type cityData = {
  dt_txt: string;
  main: cityDataMain;
  weather: cityDataWeather[];
  wind: { speed: number };
};

export type appState = {
  city: string;
  cityData: cityData[];
  loading: boolean;
  showFahrenheit: boolean;
  coords: { lat: number; lon: number };
};

export type weatherContext = {
  state: appState;
};

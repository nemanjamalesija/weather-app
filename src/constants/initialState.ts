import { appState } from '../types/types';

const cityDataMain = {
  feels_like: 0,
  humidity: 0,
  pressure: 0,
  temp: 0,
  temp_max: 0,
  temp_min: 0,
};

const cityDataWeather = [{ description: '', icon: '', main: '' }];

export const initialState: appState = {
  city: 'Paris',
  coords: { lat: 0, lon: 0 },
  cityData: [
    {
      dt_txt: '',
      main: cityDataMain,
      weather: cityDataWeather,
      wind: { speed: 0 },
    },
  ],
  loading: true,
  showFahrenheit: false,
};

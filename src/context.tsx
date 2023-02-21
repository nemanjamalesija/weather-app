import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import { initialState } from './constants/initialState';
import {
  appState,
  cityData,
  cityDataWeather,
  weatherContext,
} from './types/types';
import './index.css';

const coordsUrl = `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY = `20f7632ffc2c022654e4093c6947b4f4`;
const cityURL = `https://api.openweathermap.org/data/2.5/forecast?`;

//////////////context
const AppContext = React.createContext<weatherContext>({
  state: initialState,
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<appState>(initialState);

  // get coordinates
  useEffect(() => {
    const fetchCityCoords = (url: string) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not OK');
          }
          return response.json();
        })
        .then((data) => {
          setState((prev) => {
            const { lon, lat } = data.coord;

            return { ...prev, coords: { lat, lon } };
          });
        })
        .catch((error) => {
          throw new Error(
            'There has been a problem with your fetch operation:',
            error
          );
        });
    };

    fetchCityCoords(`${coordsUrl}q=${state.city}&APPID=${API_KEY}`);
  }, [state.city]);

  //fetch city
  useEffect(() => {
    const {
      coords: { lat, lon },
    } = state;

    if (!lat || !lon) return;

    const fetchCity = (url: string) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) return;
          else return response.json();
        })
        .then((data) => {
          if (!data) return;

          const { list } = data;
          console.log(list);
          setState((prev) => {
            return { ...prev, loading: false, cityData: list };
          });
        })
        .catch((error) => {
          throw new Error(
            'There was a problem with your fetch city request',
            error
          );
        });
    };

    fetchCity(`${cityURL}lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        state: { ...state },
      }}
    ></AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import { initialState } from './constants/initialState';
import { appState, weatherContext } from './types/types';
import './index.css';
import { options } from 'yargs';

const coordsUrl = `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY = `20f7632ffc2c022654e4093c6947b4f4`;
const cityURL = `https://api.openweathermap.org/data/2.5/forecast?`;

//////////////context
const AppContext = React.createContext<weatherContext>({ state: initialState });

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState(initialState);

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
  }, [state.coords.lat, state.coords.lon]);

  // get 5 day data from the entire API data
  const chunkDays = (array: appState['cityData'], size: number) =>
    array.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(array.slice(i, i + size));
      return acc;
    }, []);

  const daysToDisplay = chunkDays(state.cityData, 9).map(
    (item: any) => item[0]
  ) as any;

  console.log(daysToDisplay);

  const getMainPropertyFrom = (property: any) => {
    return property.slice(0, 1)[0];
  };

  // get data for daily display

  const days = daysToDisplay?.map((day: any) => day?.dt_txt);
  const dates = days?.map((day: any) => {
    if (!day) return;
    const date = new Date(day);
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });

    return formatter.format(date);
  });

  const descriptions = daysToDisplay
    ?.map((day: any) => day?.weather)
    .flat(1)
    .map((item: any) => item?.description);

  const iconsDays = daysToDisplay
    .map((day: any) => day?.weather)
    .flat(1)
    .map((item: any) => item?.icon);

  const humidity = daysToDisplay.map((day: any) => day?.main?.humidity);

  const tempFeelsLike = daysToDisplay?.map((day: any) =>
    Math.round(day?.main?.feels_like - 273.15)
  );

  const tempMax = daysToDisplay?.map((day: any) =>
    Math.round(day?.main?.temp_max - 273.15)
  );

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

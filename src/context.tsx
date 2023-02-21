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

  // get 5 day data from the entire API data
  const chunkDays = (array: cityData[], size: number) => {
    return array.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(array.slice(i, i + size));
      return acc;
    }, [] as any);
  };

  const daysToDisplay = chunkDays(state.cityData, 9).map(
    (item: cityData[]) => item[0]
  ) as cityData[];

  const dates = daysToDisplay
    .map((day: cityData) => day.dt_txt)
    .map((dateString: string) => {
      if (!dateString) return '';
      else {
        const date = new Date(dateString);
        const formatter = new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        });
        return formatter.format(date);
      }
    });

  const descriptions = daysToDisplay
    ?.map((day: cityData) => day.weather)
    .flat(1)
    .map((item: cityDataWeather) => item.description);

  const iconsDays = daysToDisplay
    .map((day: cityData) => day.weather)
    .flat(1)
    .map((item: cityDataWeather) => item.icon);

  const humidity = daysToDisplay.map((day: cityData) => day.main.humidity);

  const tempFeelsLike = daysToDisplay.map((day: cityData) =>
    Math.round(day.main.feels_like - 273.15)
  );

  const tempMax = daysToDisplay.map((day: cityData) =>
    Math.round(day.main.temp_max - 273.15)
  );

  // get current day properties
  const getMainPropertyFrom = (property: any) => {
    return property.slice(0, 1)[0];
  };

  const dateMAIN = dates.slice(0, 1);
  const tempMain = getMainPropertyFrom(tempFeelsLike);
  const tempMaxMain = getMainPropertyFrom(tempMax);
  const humidityMain = getMainPropertyFrom(humidity);
  const iconMAIN = getMainPropertyFrom(iconsDays);
  const descriptionMAIN = descriptions
    .map((desc) => desc.charAt(0).toUpperCase() + desc.slice(1).toLowerCase())
    .slice(0, 1);

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

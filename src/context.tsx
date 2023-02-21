import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import { initialState } from './constants/initialState';
import './index.css';
import { weatherContext } from './types/types';

const coordsUrl = `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY = `20f7632ffc2c022654e4093c6947b4f4`;
const cityURL = `https://api.openweathermap.org/data/2.5/forecast?`;

//////////////context
const AppContext = React.createContext<weatherContext>({ state: initialState });

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState(initialState);

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

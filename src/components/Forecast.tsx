import React from 'react';

import { cityData, cityDataWeather } from '../types/types';
import { useGlobalContext } from '../context';
import MainInfoCelsius from './MainInfoCelsius';
import AditionalInfoCelsius from './AditionalInfoCelsius';
import DayForecastItem from './DayForecastItem';

const Forecast = () => {
  const { state } = useGlobalContext();

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

  const tempMax = daysToDisplay.map((day: cityData) =>
    Math.round(day.main.temp_max - 273.15)
  );

  const humidity = daysToDisplay.map((day: cityData) => day.main.humidity);

  const iconsDays = daysToDisplay
    .map((day: cityData) => day.weather)
    .flat(1)
    .map((item: cityDataWeather) => item.icon);

  const descriptions = daysToDisplay
    ?.map((day: cityData) => day.weather)
    .flat(1)
    .map((item: cityDataWeather) => item.description);

  const tempFeelsLike = daysToDisplay.map((day: cityData) =>
    Math.round(day.main.feels_like - 273.15)
  );

  // get current day properties
  const getMainPropertyFrom = (property: any) => {
    return property.slice(0, 1)[0];
  };

  const dateMAIN = dates.slice(0, 1);
  const tempMain = getMainPropertyFrom(tempFeelsLike) as number;
  const tempMaxMain = getMainPropertyFrom(tempMax) as number;
  const humidityMain = getMainPropertyFrom(humidity) as number;
  const iconMAIN = getMainPropertyFrom(iconsDays) as string;
  const descriptionMAIN = descriptions
    .map((desc) => desc.charAt(0).toUpperCase() + desc.slice(1).toLowerCase())
    .slice(0, 1);
  const windSpeedMain = daysToDisplay
    .map((day) => (day.wind.speed * 18) / 5)
    .slice(0, 1)[0];

  return (
    <div className="container-app">
      <section className="section section-main">
        <div className="container container-main">
          <MainInfoCelsius
            date={dateMAIN}
            temp={tempMain}
            icon={iconMAIN}
            description={descriptions}
          />
          <AditionalInfoCelsius
            tempMax={tempMaxMain}
            humidity={humidityMain}
            windSpeed={windSpeedMain}
          />
        </div>
      </section>
      <section className="section-forecast-days">
        <div className="container container-forecast-days">
          {daysToDisplay.map((_, i) => {
            return (
              <DayForecastItem
                key={i}
                index={i}
                dates={dates}
                tempMax={tempMax}
                humidity={humidity}
                iconsDays={iconsDays}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Forecast;

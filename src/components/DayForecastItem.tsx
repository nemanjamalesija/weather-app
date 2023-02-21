import React from 'react';
import { WiHumidity } from 'react-icons/wi';

type dayForecastItemProps = {
  index: number;
  dates: string[];
  tempMax: number[];
  iconsDays: string[];
  humidity: number[];
};

const DayForecastItem = ({
  index,
  dates,
  tempMax,
  iconsDays,
  humidity,
}: dayForecastItemProps) => {
  return (
    <div>
      <h5 className="days-item">{dates[index]}</h5>
      <p className="temp-max-item">{tempMax[index]}</p>
      <p className="temp-min-item">
        <WiHumidity />
        {humidity[index]} %
      </p>
      <div className="temp-icon-div">
        <img
          className="icon-days"
          src={`https://openweathermap.org/img/w/${iconsDays[index]}.png`}
          alt={`${dates[index]} weather data`}
        />
      </div>
    </div>
  );
};

export default DayForecastItem;

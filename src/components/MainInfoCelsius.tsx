import React from 'react';

type mainInfoProps = {
  date: string[];
  temp: number;
  tempMax: number;
  icon: string;
  description: string[];
};

const MainInfoCelsius = ({
  date,
  temp,
  tempMax,
  icon,
  description,
}: mainInfoProps) => {
  return <div>MainInfoCelsius</div>;
};

export default MainInfoCelsius;

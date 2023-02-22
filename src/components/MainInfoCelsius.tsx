import { useGlobalContext } from '../context';

type mainInfoProps = {
  date: string[];
  temp: number;
  icon: string;
};

const MainInfoCelsius = ({ date, temp, icon }: mainInfoProps) => {
  const {
    state: { city },
  } = useGlobalContext();
  return (
    <div className="main-left-side">
      <h2 className="main-description">description</h2>
      <h5 className="heading-fifth">
        {city.charAt(0).toUpperCase() + city.slice(1)}
      </h5>
      <p className="main-date">{date}</p>
      <h2 className="temerature-main">{temp} &deg;C</h2>

      <div className="image-div">
        <img
          className="main-icon"
          src={`https://openweathermap.org/img/w/${icon}.png`}
          alt="Current city"
        />
      </div>
      <div className="search-div ">
        add input here
        <div> add handler here</div>
      </div>
    </div>
  );
};

export default MainInfoCelsius;

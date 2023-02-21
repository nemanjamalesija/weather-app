import { RiTempColdLine } from 'react-icons/ri';
import { WiHumidity, WiNightCloudyWindy } from 'react-icons/wi';

type aditionalDataProps = {
  tempMax: number;
  humidity: number;
  windSpeed: number;
};

const AditionalData = ({
  tempMax,
  humidity,
  windSpeed,
}: aditionalDataProps) => {
  return (
    <div className="main-right-side">
      <div className="info-block-info">
        <div className="icon-info">
          <RiTempColdLine className="right-side-icon" />
        </div>
        <div className="info-text-div">
          <p className="info-info">Max temperature</p>
          <p className="info-info-v">{tempMax} &deg;C</p>
        </div>
      </div>
      <div className="info-block-info">
        <div className="icon-info">
          <WiHumidity className="right-side-icon" />
        </div>
        <div className="info-text-div">
          <p className="info-info">Humidity</p>
          <p className="info-info-v">{humidity} %</p>
        </div>
      </div>
      <div className="info-block-info">
        <div className="icon-info">
          <WiNightCloudyWindy className="right-side-icon" />
        </div>
        <div className="info-text-div">
          <p className="info-info">Wind Speed</p>
          <p className="info-info-v">{Number(windSpeed).toFixed(2)} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default AditionalData;

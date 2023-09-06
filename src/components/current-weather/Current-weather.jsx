import "./Current-weather.css";

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather scale-in-center">
      <div className="top">
        <div>
          {data.data.label == "" && (
            <p className="city">{`${data.name},${data.sys.country}`}</p>
          )}
          {data.data.label != "" && (
            <p className="city">{`${data.data.label}`}</p>
          )}
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          src={`../../icons/${data.weather[0].icon}.png`}
          alt="weather"
          className="weather-icon"
        />
      </div>
      <div className="bottom">
        <div className="temperature">{Math.round(data.main.temp)}°C</div>
        <div className="details">
          <div className="details-row">
            <span className="details-label">Sensación Térmica</span>
            <span className="details-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>

          <div className="details-row">
            <span className="details-label">Humedad</span>
            <span className="details-value">{data.main.humidity}%</span>
          </div>
          <div className="details-row">
            <span className="details-label">Vientos</span>
            <span className="details-value">{data.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

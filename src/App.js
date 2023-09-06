import "./App.css";
import Search from "./components/search/Search";
import { useState, useEffect } from "react";
import CurrentWeather from "./components/current-weather/Current-weather";
import Home from "./components/home/Home";
import Forecast from "./components/forecast/Forecast";
import {
  CURRENT_WEATHER_URL,
  FORECAST_WEATHER_URL,
  WEATHER_API_KEY,
} from "./api";
function App() {
  const [currentWeatherData, setCurrentWeather] = useState(null);
  const [forecastWeatherData, setForecastWeather] = useState(null);
  const [location, setLocation] = useState(false);
  const activarLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const LOCATION = {
        value: `${position.coords.latitude} ${position.coords.longitude}`,
        label: "",
      };
      searchData(LOCATION);
    });
  };

  const searchData = (data) => {
    setLocation(true);
    const [lat, lon] = data.value.split(" ");
    const currentWeatherFetch = fetch(
      `${CURRENT_WEATHER_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=es`
    );
    const forecastWeatherFetch = fetch(
      `${FORECAST_WEATHER_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=es`
    );
    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ data, ...weatherResponse });
        setForecastWeather({ data, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <Search setSearchData={searchData} />
      {!location && <Home activarLocation={activarLocation} />}
      {currentWeatherData && <CurrentWeather data={currentWeatherData} />}
      {forecastWeatherData && <Forecast data={forecastWeatherData} />}
    </div>
  );
}

export default App;

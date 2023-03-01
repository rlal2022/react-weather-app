import React, { useState, useEffect } from "react";
import axios from "axios";

function GetWeather(props) {
  const [weatherData, setWeatherData] = useState([]);

  // const initialValues = {
  //   current_weather: {
  //     temperature: props.weatherData.temperature,
  //     windspeed: props.weatherData.windspeed,
  //     weathercode: props.weatherData.weathercode,
  //   },
  //   daily: {
  //     apparent_temperature_max: props.weatherData.apparent_temperature_max[0],
  //     apparent_temperature_min: props.weatherData.apparent_temperature_min[0],
  //     precipitation_sum: props.weatherData.precipitation_sum[0],
  //     weathercode: props.weatherData.weathercode,
  //     temperature_2m_max: props.weatherData.temperature_2m_max[0],
  //     temperature_2m_min: props.weatherData.temperature_2m_min[0],
  //   },
  //   hourly: {
  //     apparent_temperature: props.weatherData.apparent_temperature[0],
  //     precipiation: props.weatherData.precipiation[0],
  //     temperature_2m: props.weatherData.temperature_2m[0],
  //     weathercode: props.weatherData.weathercode,
  //   },
  // };

  useEffect(() => {
    axios
      .get(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FLos_Angeles"
      )
      .then((res) => {
        setWeatherData([res.data]);
        console.log(res.data);
      })
      .catch((err) =>
        console.log("We ran into an error fetching your weather data!")
      );
  }, []);

  return weatherData.map((weather, idx) => {
    return (
      //fix later convert this into table format for daily and hourly
      <div key={idx} className="container">
        <div className="display-location">
          {weather.longitude}, {weather.latitude}
        </div>
        <div className="header-current-info">
          <span>{weather.current_weather.temperature}&deg; F </span>
          <span>{weather.current_weather.windspeed} mph</span>
        </div>
        <div className="header-weather-icon"></div>
        <div className="weather-card-info">
          <div className="daily-weather">
            <span>{weather.daily.apparent_temperature_max[0]}</span> <br></br>
            <span>{weather.daily.apparent_temperature_min[0]}</span>
            <br></br>
            <span>{weather.daily.precipitation_sum[0]}</span>
            <br></br>
            <span>{weather.daily.sunrise[0]}</span>
            <br></br>
            <span>{weather.daily.sunset[0]}</span>
            <br></br>
            <span>{weather.daily.temperature_2m_max[0]}</span>
            <br></br>
            <span>{weather.daily.temperature_2m_min[0]}</span>
            <br></br>
            <span>{weather.daily.weathercode[0]}</span>
            <br></br>
          </div>
        </div>
        <div className="hourly-weather">
          <span>{weather.hourly.apparent_temperature[0]}</span> <br></br>
          <span>{weather.hourly.precipitation[0]}</span>
          <br></br>
          <span>{weather.hourly.temperature_2m[0]}</span>
          <br></br>
          <span>{weather.hourly.windspeed_10m[0]}</span>
          <br></br>
          <span>{weather.hourly.weathercode[0]}</span>
          <br></br>
        </div>
      </div>
    );
  });
}

export default GetWeather;

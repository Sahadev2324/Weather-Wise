import React, { useState, useEffect } from "react";
import Navbar from "../src/components/Navbar";
import MainWeatherCard from "../src/components/Mainweather";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/TodyaHighlights";

import axios from "axios";

const WeatherDashboard = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London'); 
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = 'cd52067040cd231d152092409dfd1248'; 
    axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(response => {
        setAirQualityData(response.data.list[0]); 
      })
      .catch(error => console.error('Error fetching the air quality data:', error));
  };

  const fetchWeatherData = (city) => {
    const API_KEY = 'cd52067040cd231d152092409dfd1248'; 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        console.log(JSON.stringify(data));
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
          .then(response => {
            setFiveDayForecast(response.data);
          })
          .catch(error => console.error('Error fetching the 5-day forecast data:', error));

      })
      .catch(error => console.error('Error fetching the weather data:', error));
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };


  return (
    <div>
      <Navbar onSearch={handleSearch} />
      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <MainWeatherCard weatherData={weatherData} />
            <p style={{ fontWeight: "700", fontSize: "20px", marginTop: "20px" }}>5 Days Forecast</p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: "0.5", gap: "20px" }}>
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />

          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;

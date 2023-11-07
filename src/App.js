import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  // Load cached data from local storage when the component mounts
  useEffect(() => {
    const cachedDataJSON = localStorage.getItem('cachedWeatherData');
    if (cachedDataJSON) {
      setData(JSON.parse(cachedDataJSON));
    }
  }, []);

  const updateCachedData = (newData) => {
    localStorage.setItem('cachedWeatherData', JSON.stringify(newData));
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=33ff07722af380aa038f0fa96f0b86d1`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(url)
        .then((response) => {
          const newData = response.data;
          setData(newData);
          console.log(newData);
          // Update the cached data with the new search result
          updateCachedData(newData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      setLocation('');
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="bold">{data.main.feels_like.toFixed()}°C</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? (
              <p className="bold">{data.wind.speed.toFixed()}KPH</p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

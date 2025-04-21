import React, { useState } from 'react';

function App() {
  const [weather, setWeather] = useState(null);
  const [temperatures, setTemperatures] = useState(null);
  const [city, setCity] = useState('');
  const [newCity, setNewCity] = useState('');
  //const [lat, setLat] = useState(0);
  //const [lon, setLon] = useState(0);
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const [tempError, setTempError] = useState('');
  const [tempErrorMessage, seTempErrorMessage] = useState(false);

  const API_KEY = '66fc738f52b19a4f2eadf7b062f38778';

  async function fetchData(e) {
    e.preventDefault();
    setWeather(null);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      //throw new Error('City not found');
      setError('City not found.');
      setErrorMessage(true);
    } else {
      const data = await response.json();

      setWeather(data);
      setError('');
      setErrorMessage(false);
      console.log(data);
    }
  }

  async function fetchTemperatures(e) {
    e.preventDefault();
    setTemperatures(null);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${newCity}&cnt=3&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      //throw new Error('City not found');
      setTempError('City not found.');
      seTempErrorMessage(true);
    } else {
      const data = await response.json();

      setTemperatures(data);
      setTempError('');
      seTempErrorMessage(false);
      //console.log(data);
    }

    //console.log(data);
  }

  return (
    <div className="App">
      <div className="input-container">
        <form onSubmit={fetchData}>
          <label>Enter city name</label>
          <input
            type="text"
            className="city-input"
            placeholder="Enter city name..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <button type="submit">Submit</button>
        </form>

        <form onSubmit={fetchTemperatures}>
          <label>Enter city for daily forecast</label>
          <input
            type="text"
            className="city-input"
            placeholder="Enter city name..."
            onChange={(e) => setNewCity(e.target.value)}
            value={newCity}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="weather-container">
        {!errorMessage && weather && (
          <div className="weather-data">
            <p>
              City: {weather.name} , Country: {weather.sys?.country}
            </p>
            <p>Temperature: {weather.main?.temp} °C</p>
            <p>
              Weather:{' '}
              {Array.isArray(weather.weather) && weather.weather[0]?.main}
            </p>
            <p>Wind: {weather.wind?.speed} m/s</p>
            <p>Humidity: {weather.main?.humidity} %</p>
            <p>Longitude: {weather.coord?.lon}</p>
            <p>Latitude: {weather.coord?.lat}</p>
          </div>
        )}

        {!tempErrorMessage && temperatures?.list && (
          <div className="weather-data">
            Temperatures:
            {temperatures.list.slice(0, 3).map((item, index) => (
              <div key={index}>
                <p>
                  Forecast time: {new Date(item.dt * 1000).toLocaleString()}
                </p>
                <p>Temperature: {item.main?.temp} °C</p>
                <p>Weather: {item.weather?.[0]?.main}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="error-container">
        {errorMessage ? (
          <div className="error-message">
            <span>{error}</span>
          </div>
        ) : (
          <div></div>
        )}
        {tempErrorMessage ? (
          <div className="error-message">
            <span>{tempError}</span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;

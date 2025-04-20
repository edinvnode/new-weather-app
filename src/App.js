import React, { useEffect, useState } from 'react';

const API_KEY = '66fc738f52b19a4f2eadf7b062f38778';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

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
    }

    //console.log(data);
  }

  return (
    <div className="App">
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
      {!errorMessage && (
        <div className="weather-data">
          <p>
            City {weather?.name} , Country: {weather?.sys?.country}
          </p>
          <p>Temperature: {weather?.main?.temp} °C</p>
          <p>Weather: {weather?.weather[0]?.main}</p>
          <p>Wind: {weather?.wind?.speed} m/s</p>
          <p>Humidity: {weather?.main?.humidity} %</p>
        </div>
      )}
      {errorMessage && (
        <div className="error-message">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default App;

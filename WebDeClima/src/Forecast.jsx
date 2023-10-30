import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Forecast = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedDate, setSelectedDate] = useState(null);

  const { city } = useParams();

  const unitTypeSymbol = {
    imperial: '°F',
    metric: '°C',
    '': 'K',
  };

  const unitType = 'metric';

  async function getWeatherData() {
    try {
      setError();
      setLoading(true);

      // get longitude and latitude based on the city that the user inputs
      let resp = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=67646a4c3b21882f4ac4ce62b72cd535&lang=es`
      );
      const lat = resp.data[0].lat;
      const long = resp.data[0].lon;

      // set your API key here
      const apiKey = '67646a4c3b21882f4ac4ce62b72cd535';

      // Make weather API call using axios
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unitType}&lang=es`
      );

      setWeatherData(weatherData.data.list);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWeatherData();
  }, []);

  // Function to group weather data by day
  const groupWeatherDataByDay = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const date = item.dt_txt.split(' ')[0]; // Extract the date part
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    return groupedData;
  };

  const handleCardClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      {loading ? (
        <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
          <div>Cargando...</div>
        </div>
      ) : (
        <div className="container">
          {Object.entries(groupWeatherDataByDay(weatherData)).map(
            ([date, dayData]) => (
              <div key={date} className="mt-3">
                <div className="card p-3 shadow border-0 mt-3 rounded" style={{ background: 'transparent' }}>
                  <div className="d-flex" style={{ width: '100%' }}>
                    <div style={{ width: '30%' }}>
                      <h3>{new Date(date).toLocaleDateString('es-ES', { weekday: 'long' })}</h3>
                      <p>{new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</p>
                    </div>
                    <div style={{ width: '70%' }}>
                      <div id={`carousel-${date}`} className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                          {dayData.map((item, index) => (
                            <div
                              key={index}
                              className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            >
                              <div className="d-flex justify-content-around" style={{ width: '100%' }}>
                                <div style={{ width: '30%' }}>
                                  <div>{item.dt_txt.split(' ')[1]}</div>
                                  <div>
                                    Temperatura: {item.main.temp} {unitTypeSymbol[unitType]}
                                  </div>
                                  <div>
                                    Sensación térmica: {item.main.feels_like} {unitTypeSymbol[unitType]}
                                  </div>
                                  <div>
                                    Humedad: {item.main.humidity} %
                                  </div>
                                  <div>
                                    Presión: {item.main.pressure} Pa
                                  </div>
                                </div>
                                <div style={{ width: '30%' }} className="text-center">
                                  <img
                                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                    alt="Weather Icon"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target={`#carousel-${date}`}
                          data-bs-slide="prev"
                        >
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target={`#carousel-${date}`}
                          data-bs-slide="next"
                        >
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Forecast;


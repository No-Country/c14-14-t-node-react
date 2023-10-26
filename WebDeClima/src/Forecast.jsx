import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";

const Forecast = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const { city } = useParams();
    

    const unitTypeSymbol = {
        'imperial': '°F',
        'metric': '°C',
        '': 'K',
      };
    
    const unitType = 'metric';
    
    async function getWeatherData() {
        try {
          setError();
          setWeatherData([]);
          setLoading(true);
    
          //get longitude and latitude based on city that user inputs
          let resp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=67646a4c3b21882f4ac4ce62b72cd535&lang=es`);          
          const lat = resp.data[0].lat;
          const long = resp.data[0].lon;
    
          //set your api key here
          const apiKey = '67646a4c3b21882f4ac4ce62b72cd535';
    
          //Make weather api call using axios
          const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unitType}&lang=es`);

          setWeatherData(weatherData.data.list);
          console.log(weatherData.data.list);
    
        } catch (e) {
          console.log(47, e);
          setError(e);
        } finally {
          setLoading(false);
        }
    
      }

      

    /*   useEffect(() => {
        if (city === null) {
          getUserPosition()
        } else {
            getWeatherData(); // Call your existing function if city is not null
          }
      }, []);


        async function getUserPosition() {
            try {
              setError();
              setLoading(true);
    
              // Get user's geolocation
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                  const userLat = position.coords.latitude;
                  const userLon = position.coords.longitude;
    
                  const apiKey = '67646a4c3b21882f4ac4ce62b72cd535'; // Replace with your API key
    
                  const userWeatherData = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&appid=${apiKey}&units=${unitType}&lang=es`
                  );
    
                  setWeatherData(userWeatherData.data.list);
                });
              } else {
                console.error('Geolocation is not supported by your browser.');
              }
            } catch (e) {
              console.error(e);
              setError(e);
            } finally {
              setLoading(false);
            }
          }
         */
          useEffect(() => {
            getWeatherData();
        }, [])
      


  return (
    <>
    {loading ?
      <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
        <div>Cargando...</div>
      </div>
      : <div className='container'>
            <div className='row'>
                {weatherData.map((weatherData, index) =>
                    <div sm={4} className="mt-3" key={index}> 
                        <div className='card p-3 shadow border-0 mt-3 rounded'>
                        <div className='d-flex justify-content-between'>
                        <div>
                            {weatherData.dt_txt}
                        </div>
                        <div>

                            Temperatura: {weatherData.main.temp} {unitTypeSymbol[unitType]}
                        </div>
                        </div>
                        <div className="d-flex justify-content-center">
                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                        </div>
                        <div className='d-flex justify-content-between'>
                        <div>
                            {weatherData.weather[0].main}
                        </div>
                        <div>
                            Sensación térmica  {weatherData.main.feels_like} {unitTypeSymbol[unitType]}
                        </div>
                    </div>
                </div>
            </div>
                
          )}
            </div>
        </div>
    } 

  </>
  )
}

export default Forecast
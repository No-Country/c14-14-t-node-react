import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const Forecast = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const unitTypeSymbol = {
        'imperial': '°F',
        'metric': '°C',
        '': 'K',
      };
    
    //set unit type
    //const unitType = 'imperial';
    //const unitType = '';
    const unitType = 'metric';
    


    async function getWeatherData() {
        try {
          setError();
          setWeatherData([]);
          setLoading(true);
    
          //get longitude and latitude based on city that user inputs
          let resp = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=67646a4c3b21882f4ac4ce62b72cd535&lang=es`);          
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


  return (
    <>
    {loading ?
      <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
        <div>Cargando...</div>
      </div>
      : <div className='container'>
            <div className='row'>
                <div className='text-center mt-5'>
                    <input onChange={(e) => { setCity(e.target.value) }} />
                    <button className='ms-2' onClick={getWeatherData} variant="primary">Submit</button>{' '}

                    {error ? <div className='text-danger'>
                    Parece que la ciudad no existe...
                    </div> : <h3 className='mt-3'> Pronostico en... {city}
                    </h3>}
                </div>

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
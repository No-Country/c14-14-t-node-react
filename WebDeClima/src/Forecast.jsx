import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";

const Forecast = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const { location } = useParams();

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
          let resp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=67646a4c3b21882f4ac4ce62b72cd535&lang=es`);          
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

      useEffect(() => {
        getWeatherData();
      }, []);
    

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
        {loading ? (
          <div>Cargando...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          weatherData.map((data) => (
            <div className='col-2 m-2' key={data.dt}>
                <div className='card forecastCard'>
                <div className='card-body d-flex justify-content-between'>
                  <div>{data.dt_txt}</div>
                  <div>
                    Temperatura: {data.main.temp} {unitTypeSymbol[unitType]}
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                    <img className="card-img-top" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Card image cap"/>
                </div>
                <div className='d-flex justify-content-between'>
                  <div>{data.weather[0].main}</div>
                  <div>
                    Sensación térmica {data.main.feels_like} {unitTypeSymbol[unitType]}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
{/* 
    {loading ?
      <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      : <Container>
        <Row className="d-flex">
          <div className='text-center mt-5'>
            <input onChange={(e) => { setCity(e.target.value) }} />
            <Button className='ms-2' onClick={getWeatherData} variant="primary">Submit</Button>{' '}

            {error ? <div className='text-danger'>
              Can't find city
            </div> : <h3 className='mt-3'>  Weather in {city}
            </h3>}
          </div>

          {weatherData.map((weatherData, index) =>
            <Col sm={4} className="mt-3" key={index}>
              <Card className="p-3 shadow border-0 mt-3 rounded">
                <div className='d-flex justify-content-between'>
                  <div>
                    {weatherData.dt_txt}
                  </div>
                  <div>

                    Current: {weatherData.main.temp} {unitTypeSymbol[unitType]}
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
                    Feels like  {weatherData.main.feels_like} {unitTypeSymbol[unitType]}
                  </div>
                </div>
              </Card>
            </Col>
          )}
        </Row>

      </Container>
    } */}

  </>
  )
}

export default Forecast
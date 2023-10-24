import "./LocationWeather.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import iconoViento from "../assets/iconos/wind_1483223.png";
import iconoNublado from "../assets/iconos/cloudy_1163661.png";
import iconoHumedad from "../assets/iconos/climate-change_4662504.png";
import iconoSensacion from "../assets/iconos/temperature_6821265.png";
import iconoTemp from "../assets/iconos/hot_1684375.png";
import iconoLluvia from "../assets/iconos/rain_2469994.png";
import iconoTormenta from "../assets/iconos/storm_1146860.png";
import iconoSoleado from "../assets/iconos/sun_869869.png";
import iconoNieve from "../assets/iconos/snow_6635585.png";

const LocationWeather = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [dataExt, setDataExt] = useState({})

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=30ae4f873a6e349b854fe6e606a8e171`
    
    
    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }


    const weatherIcon = () => {
        if (data.weather[0].main === "Rain") return <img src={iconoLluvia} alt="" />;
        if (data.weather[0].main === "Clouds") return <img src={iconoNublado} alt="" />;
        if (data.weather[0].main === "Clear") return <img src={iconoSoleado} alt="" />;
        if (data.weather[0].main === "Thunderstorm") return <img src={iconoTormenta} alt="" />;
        if (data.weather[0].main === "Snow") return <img src={iconoNieve} alt="" />;
    }

    useEffect(() => {

    }, []);

    return (
        <div className="container-fluid">
            <div className="container-clima-destino">
                <div className="search">
                    <input
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        onKeyUp={searchLocation}
                        placeholder="Ingresar destino"
                        name="destino"
                        type="search" />
                </div>
                <div className="container-clima-top-bottom">
                    <div className="clima-top">
                        <div className="location">
                            <h5>Destino: {data.name}</h5>
                        </div>
                        <div className="temp">
                            <img src={iconoTemp} alt="" />
                            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}

                        </div>
                        <div className="descripcion">
                            {data.weather ? weatherIcon() : null}
                        </div>
                        
                    </div>

                    {data.name != undefined &&

                        <div className="clima-bottom">
                            <div className="feels">
                                {data.main ? <h4>{data.main.feels_like.toFixed()}°C</h4> : null}
                                <img src={iconoSensacion} alt="" />
                            </div>
                            <div className="humidity">
                                {data.main ? <h4>{data.main.humidity}%</h4> : null}
                                <img src={iconoHumedad} alt="" />
                            </div>
                            <div className="wind">
                                {data.wind ? <h4>{data.wind.speed.toFixed()} MPH</h4> : null}
                                <img src={iconoViento} alt="" />
                            </div>
                            
                        </div>
                    }
                </div>
            </div>
            <Link to={`/forecast/${data.name}`}><button className="btn">Ver pronostico extendido</button></Link>
            
        </div>
    )
}

export default LocationWeather;

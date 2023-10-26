import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useFetch } from "../Hooks/useFetch";
import { HoursCards } from "./HoursCards";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HomeMap } from "./HomeMap";
import { OtherInfo } from "./OtherInfo";

import Browser from "./Browser";
import { DaysCards } from "./DaysCards";

import { FavLocationsContainer } from "./FavLocations/FavLocationsContainer";

const Home = () => {
    const [userPosition, setUserPosition] = useState("Buenos Aires")
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=${userPosition}&days=1&aqi=no&alerts=no`
    const { signedUser } = useContext(UserContext)
    const [corazonState, setCorazonState] = useState(false)
    const [showDays, setShowDays] = useState(false)
    const { data } = useFetch(URL)
    const [slide, setSlide] = useState(0)
    const [slider, setSlider] = useState(7)

   

    const handleNextSlide = () => {

        setSlide((slide) => slide === slider ? slide = 0 : slide + 1)

    }
    const handlePrevSlide = (arr) => {
        setSlide((slide) => slide === 0 ? slide = slider : slide - 1)
    }

    function success(position) {
        var latitud = position.coords.latitude;
        var longitud = position.coords.longitude;


        setUserPosition(`${latitud},${longitud}`)

    }

    function getPosition() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success)
            console.log("ubicacion obtenida");

        } else { "No se pudo obtener la ubicacion" }



    }

    const handleSliders = () => {
        if(!showDays && slider == 7) {
            setShowDays(true)
            setSlider(3)
        }else {
            setShowDays(false)
            setSlider(7)
        }
    }

    useEffect(() => {
        setTimeout(getPosition(), "1000")
    }, [userPosition])


     //////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [currentWeatherData, setCurrentWeatherData] = useState(null);

    async function getCurrentWeatherData() {
        try {
          setError();
          setLoading(true);
    
          const response = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=${city}&days=1&aqi=no&alerts=no`
          );
    
          setCurrentWeatherData(response.data);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      }

   
      useEffect(() => {
        console.log("currentWeatherData has changed:", currentWeatherData);
      }, [currentWeatherData]);
    
    
      return (
        <div className="home_container container-fluid">
            <div className='text-center mt-5'>
                <input onChange={(e) => { setCity(e.target.value) }} />
                <button className='ms-2' onClick={getCurrentWeatherData} variant="primary">Submit</button>{' '}
                {error ? (
                    <div className='text-danger'>
                        Parece que la ciudad no existe...
                    </div>
                ) : (
                    <h3 className='mt-3'> Pronóstico en... {city}</h3>
                )}
            </div>
    
            {city === '' ? (

        <div className="home_container container-fluid">
            <h1 className="text-start">Hola {signedUser.displayName}!</h1>
            <div>
                 {data !== undefined ? (
                        <div className="forecast_container">

                            <img src={data.forecast.forecastday[0].day.condition.icon} alt="icon-forecast"
                                className="icon_forecast"
                            />

                            <div className="d-flex justify-content-around w-50">
                                <h5 >{data.location.name}</h5>
                                <span>/</span>
                                <h5 style={{ marginLeft: "3px" }}>{data.location.region}</h5>
                            </div>
                            <div>
                                <span style={{ fontSize: "30px" }}>{data.current.temp_c}</span>
                                <span> ºC</span>
                            </div>
                            <span style={{ color: "orange" }}>{data.forecast.forecastday[0].day.condition.text}</span>

                            <div className="d-flex flex-column ">
                                <span style={{ marginRight: "5px" }}>min:  {data.forecast.forecastday[0].day.mintemp_c} ºC </span>
                                <span>max: {data.forecast.forecastday[0].day.maxtemp_c} ºC </span>

                            </div>

                            <span>{data.location.localtime}</span>

                            <div className="corazon_container" onClick={() => setCorazonState(!corazonState)}>
                                <img src={corazonState ? "./iconos/corazon_fav.png" : "./iconos/corazon.png"} alt="" />
                                    </div>
                                        <div>
                                           <Link to={`/forecast/${data.location.name}`}><button className="btn">Ver Pronostico extendido</button></Link>
                                        </div>
                            </div>
                        ) : "No se encontro informacion"}
                       
                    </div>
                        <div className="days_container">
                            <span>Hora</span>
                            <span>dia</span>
                            <span>fin de semana</span>
                        </div>
                        <div style={{height: "1px", border: "1px solid", marginTop: "3%",marginBottom: "2%"}}></div>
    
                        <div style={{marginBottom: "2%"}}>
                            <HoursCards data={data}/>
                        </div>
                        <div className="container" style={{display: "flex",alignItems: "center",width: "80%",justifyContent: "space-around"}}>
                            <HomeMap/>
                            <OtherInfo data={data}/>
                        </div>
                </div>
            ) : (
                <div>
                    <h1 className="text-start">Hola Nombre!</h1>
                    <div>
                        {loading ? (
                            <div>Cargando...</div>
                        ) : error ? (
                            <div>Error: {error.message}</div>
                        ) : currentWeatherData ? (
                            <div className="forecast_container">
                                 <img src={currentWeatherData.forecast.forecastday[0].day.condition.icon} alt="icon-forecast"
                                                className="icon_forecast"
                                                />
                                                <div className="d-flex justify-content-around w-50">
                                                    <h5 >{currentWeatherData.location.name}</h5>
                                                    <span>/</span>
                                                    <h5 style={{marginLeft: "3px"}}>{currentWeatherData.location.region}</h5>
                                                </div>
                                                <div>
                                                    <span style={{fontSize: "30px"}}>{currentWeatherData.current.temp_c}</span>
                                                    <span> ºC</span>  
                                                </div>
                                                <span style={{color: "orange"}}>{currentWeatherData.forecast.forecastday[0].day.condition.text}</span>                       
                                                <div className="d-flex flex-column ">
                                                    <span style={{marginRight: "5px"}}>min:  {currentWeatherData.forecast.forecastday[0].day.mintemp_c} ºC </span>
                                                    <span>max: {currentWeatherData.forecast.forecastday[0].day.maxtemp_c} ºC </span>
                                                </div>
                                
                                                <span>{currentWeatherData.location.localtime}</span>
    
                                                <div  className="corazon_container" onClick={()=>setCorazonState(!corazonState)}>
                                                    <img src={corazonState ? "./iconos/corazon_fav.png" : "./iconos/corazon.png"} alt="" />
                                                </div>
                            </div>
                        ) : "No se encontro informacion"}
                        <div>
                            <Link to={`/forecast/${city}`}><button className="btn">Ver Pronostico extendido</button></Link>
                        </div>
                    </div>
                    
                </div>
            )}
                       // : "No se encontro informacion"
             //   }
            </div>
                    <div className="days_arrows_container">

            <div className="days_container">
                <span className={showDays ? "disable_days" : "active_days"} onClick={handleSliders}>Hoy</span>
                <span className={showDays ? "active_days" : "disable_days"}  onClick={handleSliders}>10 dias</span>

            </div>

            <div className='arrows_container'>
                    <button onClick={handlePrevSlide} className='arrows'><img src="./iconos/left_arrow.png" alt="Deslizar a  la izquierda" /></button>
                    <button onClick={handleNextSlide} className='arrows'><img src="./iconos/right_arrow.png" alt="Deslizar a la derecha" /></button>

                </div>
                    </div>
            {/* <div style={{height: "1px", border: "1px solid", marginTop: "3%",marginBottom: "2%"}}></div> */}
           

            <hr />

            <div style={{ marginBottom: "2%" }}>
                {
                    showDays ? 
                    <DaysCards
                    
                    slide={slide}
                    />
                    :

                    <HoursCards
                    data={data}
                    slide={slide}
                />
                }
               
            </div>
            <div className="container" style={{ display: "flex", alignItems: "center", width: "80%", justifyContent: "space-around" }}>
                <HomeMap />
                <OtherInfo data={data} />


            </div>
                <hr />
                <div>
                    <FavLocationsContainer/>
                </div>

        </div>
    );
}

export default Home;



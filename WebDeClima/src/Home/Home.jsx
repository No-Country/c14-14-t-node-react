import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useFetch } from "../Hooks/useFetch";
import { HoursCards } from "./HoursCards";
import { useParams, useNavigate, Link } from "react-router-dom";

import { OtherInfo } from "./OtherInfo";
import { DaysCards } from "./DaysCards";
import { FavLocationsContainer } from "./FavLocations/FavLocationsContainer";
import { GetFavLocations } from "./FavLocations/helpers/GetFavLocations";
import { DelFavBtn } from "./FavLocations/Buttons/DelFavBtn";
import { AddFavBtn } from "./FavLocations/Buttons/AddFavBtn";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Spinner } from "./Spinner/Spinner";
import { BsSearch } from 'react-icons/bs';
import { HomeMap } from "./HomeMap";

const Home = () => {
    const [userPosition, setUserPosition] = useState("Buenos Aires")
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=${userPosition}&days=1&aqi=no&alerts=no&lang=es`
    const { signedUser, favLocations, setFavLocations } = useContext(UserContext)
    const [corazonState, setCorazonState] = useState(false)
    const [showDays, setShowDays] = useState(false)
    const { data } = useFetch(URL)
    const [slide, setSlide] = useState(0)
    const [slider, setSlider] = useState(7)
    const [latLong, setLatLong] = useState({
        lat: "-24.52713",
        long: "-43.59375;2"
    })

    const handleNextSlide = () => {
        setSlide((slide) => slide === slider ? slide = 0 : slide + 1)

    }
    const handlePrevSlide = (arr) => {
        setSlide((slide) => slide === 0 ? slide = slider : slide - 1)
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



    function success(position) {
        var latitud = position.coords.latitude;
        var longitud = position.coords.longitude;
        // setLatLong({
        //     lat: latitud,
        //     long: longitud        })
        setUserPosition(`${latitud},${longitud}`)
        console.log(position);
    }
    function getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success)
        //     console.log("ubicacion obtenida");
        } else { "No se pudo obtener la ubicacion" }
    }

    const formatLocalTime = (localTime) => {
        const date = new Date(localTime);
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const day = days[date.getDay()];
        const options = { day: "numeric", month: "long" };
        return `${day}, ${date.toLocaleDateString('es-ES', options)}`;
    };

    const getLocations = async (uid) => {
        const querySnapshot = await getDocs(collection(db, `/Clientes/${uid}/Favoritos`));
        // console.log(querySnapshot);
        setFavLocations(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }
    
    const handleHearts = (city) => {
    
   

           let tieneValorEspecifico = favLocations.some(element => Object.values(element).includes(city));
           setCorazonState(tieneValorEspecifico)
           console.log(corazonState,city);
           


    }

    /////////////////////////////////////////////////////////////////////
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);


    async function getCurrentWeatherData() {
        try {
          setError();
          setLoading(true);
    
          const response = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=${city}&days=1&aqi=no&alerts=no&lang=es`
          );
    
          setCurrentWeatherData(response.data);
          console.log(currentWeatherData);
          handleHearts(response.data.location.name);
          console.log(response.data.location.name);
          setSearchPerformed(true); 
        } catch (e) {
          setError(e);
         
        } finally {
          setLoading(false);
        }
    }
   

    useEffect(() => {
        //  getPosition()
      
        handleHearts(data ? data.location.name : "")
     
     }, [favLocations]);

     useEffect(() => {
    
   getPosition()


    }, [currentWeatherData])
 

    
    return (
        <div className="home_container container-fluid justify-content-center m-0 p-0">
            <div className='d-flex text-center justify-content-center pt-5 searchDiv'>
                <input className="form-control custom-opacity-bg shadow-lg w-50 border-0" placeholder="El clima en..." onChange={(e) => { setCity(e.target.value) }} />
                <button type="submit" className="btn ms-2 btn-outline-light rounded-pill" onClick={getCurrentWeatherData} variant="primary"><BsSearch/></button>
            </div>
            <h2 className="titleName mb-5 pb-3 mt-3">¡Hola {signedUser.displayName}!</h2>
            {!searchPerformed ? (
                <div className="w-100">
                    <div className="currentWeather">
                        {data !== undefined ? (
                            <div className="forecast_container">
                                <img src={data.forecast.forecastday[0].day.condition.icon}  alt="icon-forecast" className="icon_forecast"/>
                                <div className="d-flex justify-content-around w-50">
                                    <h5>{formatLocalTime(data.location.localtime)}</h5>
                                </div>
                                <div> 
                                    <h3>{data.location.name}, {data.location.region}</h3>
                                </div>
                                <div>
                                    <h1>{data.current.temp_c} ºC</h1>
                                </div>
                                <p className="m-0 p-0">{data.forecast.forecastday[0].day.condition.text}</p>
                                <div className="d-flex flex-column m-0 p-0">
                                    <p className="m-0 p-0">Máxima: {data.forecast.forecastday[0].day.maxtemp_c}ºC Mínima: {data.forecast.forecastday[0].day.mintemp_c}ºC</p>
                                </div>
                                <div className="corazon_container" onClick={()=>setCorazonState(!corazonState)}>
                                    { corazonState ?
                                        <DelFavBtn
                                            uid={signedUser.uid}
                                            cityName={currentWeatherData ? currentWeatherData.location.name : data.location.name}
                                        />
                                        :
                                        <AddFavBtn
                                            uid={signedUser.uid}
                                            cityName={currentWeatherData ? currentWeatherData.location.name : data.location.name}
                                        />
                                    } 
                                </div>
                            </div>
                        ) : "No se encontro informacion"}   
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
                            <div className="lineHome"></div>
                    <div className="mb-5 w-100 ">
                        { showDays ? 
                            <DaysCards
                                city={data.location.name}
                                slide={slide}
                            />
                            :

                            <HoursCards
                                data={data}
                                slide={slide}
                            />
                        }
                        {data && data.location && (
                            <div>
                                <Link to={`/forecast/${data.location.name}`}>
                                <button className="btn">Ver Pronostico extendido</button>
                                </Link>
                            </div>
                            )}
                    </div>
                    <div className="container" style={{ display: "flex", alignItems: "center", width: "80%", justifyContent: "space-around" }}>
                         <HomeMap position={latLong}/> 
                        <OtherInfo data={data} />
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        {loading ? (
                            // <div>Cargando...</div>
                            <Spinner/>
                        ) : error ? (
                            <div>Error: {error.message}</div>
                        ) : currentWeatherData ? (
                            <div className="forecast_container">
                                <img src={currentWeatherData.forecast.forecastday[0].day.condition.icon} alt="icon-forecast" className="icon_forecast"/>
                                <div className="d-flex justify-content-around w-50">
                                    <h2>{formatLocalTime(currentWeatherData.location.localtime)}</h2>
                                </div>
                                <div> 
                                    <h5>{currentWeatherData.location.name}, {currentWeatherData.location.region}</h5>
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
                               
                                <div className="corazon_container" onClick={()=>setCorazonState(!corazonState)}>
                                    { corazonState ?
                                        <DelFavBtn
                                            uid={signedUser.uid}
                                            cityName={currentWeatherData ? currentWeatherData.location.name : "Posadas"}
                                        />
                                        :
                                        <AddFavBtn
                                            uid={signedUser.uid}
                                            cityName={currentWeatherData ? currentWeatherData.location.name : "Posadas"}
                                        />
                                    } 
                                </div>
                            </div>
                        ) : "No se encontro informacion"}    
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
                        { showDays ? 
                            <DaysCards
                                city={currentWeatherData ? currentWeatherData.location.name: "Buenos Aires"}
                                slide={slide}
                            />
                            :
                            <HoursCards
                                data={currentWeatherData}
                                slide={slide}
                            />
                        }
                        {data && data.location && (
                            <div>
                                <div>
                                    <Link to={`/forecast/${city}`}><button className="btn">Ver Pronostico extendido</button></Link>
                                </div>
                            </div>
                            )}
                    </div>
                    <div className="container" style={{ display: "flex", alignItems: "center", width: "80%", justifyContent: "space-around" }}>
                        <HomeMap position={latLong}/>
                        <OtherInfo data={currentWeatherData} />
                    </div>
                </div>          
            )}
            <div>
                <FavLocationsContainer data={currentWeatherData || data}/>
            </div>    
        </div>     
    );
}

export default Home;


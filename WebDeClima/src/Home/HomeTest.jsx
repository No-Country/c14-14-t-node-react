import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useFetch } from "../Hooks/useFetch";
import { HoursCards } from "./HoursCards";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HomeMap } from "./HomeMap";
import { OtherInfo } from "./OtherInfo";
import { DaysCards } from "./DaysCards";
import { FavLocationsContainer } from "./FavLocations/FavLocationsContainer";
import { GetFavLocations } from "./FavLocations/helpers/GetFavLocations";
import { DelFavBtn } from "./FavLocations/Buttons/DelFavBtn";
import { AddFavBtn } from "./FavLocations/Buttons/AddFavBtn";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Spinner } from "./Spinner/Spinner";

const Home = () => {
    const [userPosition, setUserPosition] = useState("Buenos Aires")
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=${userPosition}&days=1&aqi=no&alerts=no&lang=es`
    const { signedUser, favLocations, setFavLocations } = useContext(UserContext)
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
    
    const handleSliders = () => {
        if(!showDays && slider == 7) {
            setShowDays(true)
            setSlider(3)
        }else {
            setShowDays(false)
            setSlider(7)
        }
    }

    const handleHearts = (city) => {
        console.log(city);
        let tieneValorEspecifico = favLocations.some(element => Object.values(element).includes(city));
        setCorazonState(tieneValorEspecifico)
        // for (let i = 0; i < favLocations.length; i++) {
        //   console.log(favLocations[i].cityName);
        //     if (Object.values(favLocations[i].cityName).includes(city)) {

        //      setCorazonState(true)
        //      console.log(corazonState); 
        //      break;

        //       // Romper el ciclo si se encuentra un objeto que cumple con la condición
        //     }
        //   }


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
            `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=${city}&days=1&aqi=no&alerts=no&lang=es`
          );
    
          setCurrentWeatherData(response.data);
          handleHearts(response.data.location.name);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      }

      useEffect(() => {
        setTimeout(getPosition, 1000);
        getLocations(signedUser.uid)
        //    handleHearts(currentWeatherData ? currentWeatherData.location.name : "")

    }, [])
      useEffect(() => {
      }, [currentWeatherData]);

    return (
        <>
        <div className="home_container container-fluid">
            <div className='text-center mt-5'>
                <input onChange={(e) => { setCity(e.target.value) }} />
                <button className='btn ms-2' onClick={getCurrentWeatherData} variant="primary">Buscar</button>
                {error ? (
                    <div className='text-danger'>
                        Parece que la ciudad no existe...
                    </div>
                ) : (
                    <h3 className='mt-3'> Pronóstico en... {city}</h3>
                )}
            </div>
            <h1 className="text-start">Hola {signedUser.displayName}!</h1>
            <div className="home_container container-fluid">
                {searchPerformed ? (
                     <div>
                        currentWeatherData ? (
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
                                <div>
                                        <Link to={`/forecast/${city}`}><button className="btn">Ver Pronostico extendido</button></Link>
                                </div>
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
                        )
                    </div>
                ) : (
                    <div>
                        {data !== undefined ? (
                        <ShowCity/>
                        ) : "No se encontro informacion"}
                    </div>
                )
                }
            </div>
        </div>
        </>
    )
}
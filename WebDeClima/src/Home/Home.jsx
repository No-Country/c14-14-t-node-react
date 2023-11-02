import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useFetch } from "../Hooks/useFetch";
import { FavLocationsContainer } from "./FavLocations/FavLocationsContainer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { BsSearch } from 'react-icons/bs';
import CurrentLocationWeather from "./CurrentLocationWeather";
import OtherLocationWeather from "./OtherLocationWeather";

const Home = () => {
    const [userPosition, setUserPosition] = useState("Buenos Aires")
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [isForecastCollapsed, setIsForecastCollapsed] = useState(true);
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

    const toggleForecastCollapse = () => {
        setIsForecastCollapsed(!isForecastCollapsed);
      };      

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
   
    const handleFavCardClick = (selectedCity) => {
        setCity(selectedCity);
      };
    
   useEffect(() => {
        getCurrentWeatherData();
    }, [city]); 

    useEffect(() => {
        handleHearts(data ? data.location.name : "")
    }, [favLocations]);

    useEffect(() => {
        getPosition()
    }, [currentWeatherData])
 
    return (
        <div className="home_container container-fluid justify-content-center m-0 p-0">
            <div className='d-flex text-center justify-content-center pt-5 searchDiv'>
                <input className="form-control custom-opacity-bg shadow-lg w-50 border-0" placeholder="El clima en..." onChange={(e) => { setCity(e.target.value) }} />
{/*                 <button type="submit" className="btn ms-2 btn-outline-light rounded-pill" onClick={getCurrentWeatherData} variant="primary"><BsSearch/></button>
 */}            </div>
            <h2 className="titleName mb-5 pb-3 mt-3">¡Hola {signedUser.displayName}!</h2>
            {!searchPerformed ? (
                <CurrentLocationWeather data={data} showDays={showDays} 
                    handleSliders={handleSliders} handlePrevSlide={handlePrevSlide} 
                    handleNextSlide={handleNextSlide} slide={slide} 
                    formatLocalTime={formatLocalTime} corazonState={corazonState} 
                    signedUser={signedUser} toggleForecastCollapse={toggleForecastCollapse} 
                    isForecastCollapsed={isForecastCollapsed}/>
            ) : (
                <OtherLocationWeather currentWeatherData={currentWeatherData} city={city} 
                    showDays={showDays} handleSliders={handleSliders} 
                    handlePrevSlide={handlePrevSlide} handleNextSlide={handleNextSlide} 
                    slide={slide} formatLocalTime={formatLocalTime} corazonState={corazonState} 
                    signedUser={signedUser} toggleForecastCollapse={toggleForecastCollapse} 
                    isForecastCollapsed={isForecastCollapsed}/>
                        
            )}
            <div>
                {/* <FavLocationsContainer data={currentWeatherData || data}/> */}
                <FavLocationsContainer
                        data={currentWeatherData || data}
                        onCardClick={handleFavCardClick}
                    />
            </div>    
        </div>     
    );
}

export default Home;
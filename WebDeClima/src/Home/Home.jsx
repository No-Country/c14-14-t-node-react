/* import Mapa from './components/pages/mapas/mapas'
import Clima from './components/pages/clima/clima'
import ServiceLocation from './service/service-location' */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useFetch } from "../Hooks/useFetch";
import { HoursCards } from "./HoursCards";
import Browser from "./Browser";



const Home = () => {
    const [userPosition, setUserPosition] = useState("Resistencia")
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=${userPosition}&days=1&aqi=no&alerts=no`
    const { signedUser } = useContext(UserContext)
    const { data } = useFetch(URL)

    function success (position) {
        var latitud = position.coords.latitude;
        var longitud = position.coords.longitude;
        console.log(latitud,longitud);
       
       setUserPosition(`${latitud},${longitud}`)
       console.log(userPosition);
    }

    function getPosition()  {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success)     
            console.log("ubicacion obtenida");
        } else {"No se pudo obtener la ubicacion"}
    }

    useEffect(() => {
    setTimeout(getPosition(),"2000")
    }, [userPosition])
    
    return (
        <div className="home_container container-fluid">
            <h1 className="text-start">Hola Nombre!</h1>
            <div>

                {
                    (data !== undefined) ?
                        <div className="forecast_container">

                           <img src={data.forecast.forecastday[0].day.condition.icon} alt="icon-forecast"
                            className="icon_forecast"
                           />
                          
                            <div className="d-flex justify-content-around w-50">
                            <h5 >{data.location.name}</h5>
                           <span>/</span>
                            <h5 style={{marginLeft: "3px"}}>{data.location.region}</h5>
                            </div>
                            <div>
                            <span style={{fontSize: "30px"}}>{data.current.temp_c}</span>
                           <span> ºC</span>  
                            </div>
                           <span style={{color: "orange"}}>{data.forecast.forecastday[0].day.condition.text}</span>
                           
                           <div className="d-flex flex-column ">
                           <span style={{marginRight: "5px"}}>min:  {data.forecast.forecastday[0].day.mintemp_c} ºC </span>
                           <span>max: {data.forecast.forecastday[0].day.maxtemp_c} ºC </span>

                           </div>
                          
                            <span>{data.location.localtime}</span>
                        </div>
                        : "No se encontro informacion"
                }
            </div>

                <div className="days_container">
                    <span>Hora</span>
                    <span>dia</span>
                    <span>fin de semana</span>
                </div>
               <div style={{height: "1px", border: "1px solid", marginTop: "3%"}}></div>

               <div>
                <HoursCards data={data}/>
               </div>
            {/* <Mapa />
            <Clima /> */}
        </div>
    )
}

export default Home;
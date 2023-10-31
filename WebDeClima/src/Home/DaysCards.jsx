import  { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useFetch } from '../Hooks/useFetch'
import { Spinner } from './Spinner/Spinner'

export const DaysCards = ({slide, city}) => {
    // http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7
    const [userPosition, setUserPosition] = useState("Buenos Aires")

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

    const URL = `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=${city || userPosition}&days=10&aqi=no&alerts=no`

    const {data} = useFetch(URL)
    // console.log(data);
    // console.log("USERPOSITION");
    // console.log(userPosition);


    const nameDay = (param)=> {
        const diasSemana = [ 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
        let fecha = new Date(param)
        let numeroDedia = fecha.getDay()
        let  nombreDelDia = diasSemana[numeroDedia]
        return nombreDelDia;

    }
  
  return (
    <div className={(data !== undefined) ? 'hoursCards_container container' : "centrar_spiner"} >
{  
  <div  style={{ transform: `translateX(-${slide * 10}%`, display: "flex", gap: "10px" }}  >
      {
        (data !== undefined) ? 
            data.forecast.forecastday.map((element,index) => (
            <div key={index} className= 'hoursCard_item'> 
           
                <span>{nameDay(element.date)} </span>
                <span>{element.date.slice(8,)} </span>
                <img src={element.day.condition.icon} alt="" />
                <div>
                    <span>{element.day.avgtemp_c}</span>
                    <span>  ºC</span>
                </div>

                
            </div>
            ))
                : <Spinner/>
        }  
      
    </div>}
   
    </div>
  )
}
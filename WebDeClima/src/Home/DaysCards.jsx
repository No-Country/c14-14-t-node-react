import  { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useFetch } from '../Hooks/useFetch'
import { Spinner } from './Spinner/Spinner'

export const DaysCards = ({city, slide}) => {
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

  //  const URL = `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=${city || userPosition}&days=10&aqi=no&alerts=no`
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
            <div className='justify-content-between' style={{ transform: `translateX(-${slide * 10}%`,display: "flex", gap: "10px" }}  >
                { 
                    (data !== undefined) ? data.forecast.forecastday.map((element,index) => (
                        <div key={index} className= 'hoursCard_item m-2' style={{ height: "200px", width: "150px"}}>
                            <h4>{nameDay(element.date)} </h4>
                            <h3>{element.date.slice(8,)} </h3>
                            <img src={element.day.condition.icon} alt="" />
                            <div>
                                <h4>{element.day.avgtemp_c} ºC</h4>
                            </div>  
                        </div>
                        )
                    ): <Spinner/>
                }  
        

            </div>
            ))
                : <Spinner/>
        }  
      
    </div>}
   
    </div>
  )
}
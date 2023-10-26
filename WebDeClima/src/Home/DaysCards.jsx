import  { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useFetch } from '../Hooks/useFetch'

export const DaysCards = ({slide}) => {
    // http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=Posadas&days=10&aqi=no&alerts=no`
  const {data} = useFetch(URL)
    console.log(data);


    const nameDay = (param)=> {
        const diasSemana = [ 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
        let fecha = new Date(param)
        let numeroDedia = fecha.getDay()
        let  nombreDelDia = diasSemana[numeroDedia]
        return nombreDelDia;

    }

    // }
  
  return (
    <div className='hoursCards_container container' >
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
                : ""
        }  
      
    </div>}
   
    </div>
  )
}

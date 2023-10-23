import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useFetch } from '../Hooks/useFetch'

export const HoursCards = ({data}) => {
    // const sliceString = () => {

    // }
    console.log(data);
  return (
    <div className='hoursCards_container container'>
      {
        (data !== undefined) ? 
            data.forecast.forecastday[0].hour.map((element,index) => (

            <div key={index} className='hoursCard_item'>
                <span>{element.time.slice(11,13)}</span>
                <img src={element.condition.icon} alt="" />
                <div>
                    <span>{element.temp_c}</span>
                    <span>  ºC</span>
                </div>
            </div>
            ))
                : ""
        }  
    </div>
  )
}

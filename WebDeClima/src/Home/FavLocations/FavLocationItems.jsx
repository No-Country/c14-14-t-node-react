import React from 'react'
import { useFetch } from '../../Hooks/useFetch'
import { DelFavBtn } from './Buttons/DelFavBtn'
import { Link } from 'react-router-dom'

export const FavLocationItems = ({city,uid}) => {
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=${city}&days=1&aqi=no&alerts=no`
    const {data} = useFetch(URL)
  
  return (
    <div >
       
        {
            (data !== undefined) ?
            
                <div className= 'favLocations_item'> 
                  <Link to={`/forecast/${data.location.name}`} style={{color:"black", textDecoration: "none"}}>
               
               
              

                <span>{data.location.name} </span>
                <img src={data.current.condition.icon}   alt="" />
                <div>
                    <span>{data.current.temp_c}</span>
                    <span>  ºC</span>
                </div>
               
                  </Link>
                 
                </div>
            
       
       : ""
        }
        

                
           
    </div>
  )
}

import React from 'react'
import { useFetch } from '../../Hooks/useFetch'
import { DelFavBtn } from './Buttons/DelFavBtn'
import { Link } from 'react-router-dom'
import { Spinner } from "../Spinner/Spinner";

export const FavLocationItems = ({ city, onCardClick}) => {
  const URL = `https://api.weatherapi.com/v1/forecast.json?key=519125c955044ba5924184548230211&q=${city}&days=1&aqi=no&alerts=no`
  const {data} = useFetch(URL)

  const handleCardClick = () => {
    // Llama a la función proporcionada por Home y pasa la ciudad seleccionada
    onCardClick(city);
  };
  
  return (
    <div>
      {
        (data !== undefined) ?
          <div className= 'favLocations_item'  onClick={handleCardClick}> 
            <div>
              <span>{data.location.name} </span>
            </div>
            <div>
              <img src={data.current.condition.icon}   alt="" />
            </div>
            <div>
                <span>{data.current.temp_c}</span>
                <span>  ºC</span>
            </div>
          </div>
        : <Spinner/>
      } 
    </div>
  )
}


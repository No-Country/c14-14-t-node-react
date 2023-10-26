import React from 'react'
import { FavLocationItems } from './FavLocationItems'
import './locations.css'

export const FavLocationsContainer = () => {
  const arrCitys = ["Cordoba", "Rosario", "Buenos Aires", "Posadas", "Resistencia"]
  return (
    <div className='fav_locations_container'>
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}} className='container'>
        <h5>Mis direcciones frecuentes</h5>
        <div className='arrows_container'> 
          <button className='arrows'><img src="./iconos/left_arrow.png" alt="Deslizar a  la izquierda" /></button>
          <button className='arrows'><img src="./iconos/right_arrow.png" alt="Deslizar a  la derecha" /></button>
        </div>
      </div>
        <div className="fav_locations container">
          {
           arrCitys && arrCitys.map((element,index) => (
              
              <FavLocationItems city={element} key={index}/>
            ))
          }
            
        </div>
        </div>
  )
}

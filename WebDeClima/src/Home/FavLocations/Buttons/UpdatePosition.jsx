import React, { useState } from 'react'
import './buttons.css'

export const UpdatePosition = ({setUserPosition}) => {
    const [loading, setLoading] = useState(false)
    function success(position) {
        let latitud = position.coords.latitude;
        let longitud = position.coords.longitude;
        setUserPosition(`${latitud},${longitud}`)
        console.log(position);
    }
    function getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success)
        //     console.log("ubicacion obtenida");
        } else { "No se pudo obtener la ubicacion" }
    }
    const handlePosition = () => {
        setLoading(true)
        console.log(loading);
        getPosition()
       setTimeout(setLoading(false), 3000)
       console.log(loading);
    }
  return (
    <button className={loading ? 'update_btn active_update' : "update_btn"} onClick={handlePosition}>
        <img src="./iconos/update3.png" alt="" />
    </button>
  )
}

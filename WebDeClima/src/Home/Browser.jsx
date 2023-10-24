import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const Browser = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const url = `https://api.weatherapi.com/v1/forecast.json?key=5437eae8999f4d86880185553231910&q=${location}&days=1&aqi=no&alerts=no`


    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log("Info");
                console.log(response.data)
            })
            setLocation('')
        }
    }

  return (
        <div className="container-fluid">
            <div className="container-clima-destino">
                <div className="search">
                    <input
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        onKeyUp={searchLocation}
                        placeholder="Ingresar destino"
                        name="destino"
                        type="search" />
                </div>
            </div>
        </div>
  )
}

export default Browser
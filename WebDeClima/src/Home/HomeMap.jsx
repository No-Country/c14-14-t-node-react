import React from 'react'
import { useFetch } from '../Hooks/useFetch'
// https://maps.weatherbit.io/v2.0/{source}/{field}/{time}/{z}/{x}/{y}.png
export const HomeMap = ({position}) => {
// const URL =  `https://maps.weatherbit.io/v2.0/singleband/catprecipdbz/latest/7/60/48.png?key=46095a23a5204c2da3b1c6a02be423fe`
// const {lat,long} = position
//  console.log(position);

export const HomeMap = () => {
  return (
    <div style={{width: "38%",border: "1px solid grey",height: "350px", borderRadius: "10px", display: "flex",alignItems: "center", justifyContent: "center",backgroundColor: "gray"}}>
      <iframe src="https://mapa.tutiempo.net/#-24.52713;-43.59375;2" 
        style={{width: "150%",border: "1px solid grey",height: "350px", borderRadius: "10px", display: "flex",alignItems: "center", justifyContent: "center"}}
      ></iframe>
      {/*<iframe src="https://mapa.tutiempo.net/#-38.27269;-52.73437;3" ></iframe>Muestra mapa mas enfocado en bs as*/}

    </div>
  )
}
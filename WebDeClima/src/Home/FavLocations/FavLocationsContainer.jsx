import React, { useContext, useEffect, useState } from 'react'
import { FavLocationItems } from './FavLocationItems'
import './locations.css'
import { UserContext } from '../../context/userContext'

import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseConfig/firebase'
import { GetFavLocations } from './helpers/GetFavLocations'

export const FavLocationsContainer = () => {
  const {signedUser,favLocations,setFavLocations} = useContext(UserContext)
  const [slide, setSlide] = useState(0)
  
  const {uid} = signedUser


  const handleNextSlide = () => {

      setSlide((slide) => slide === 6 ? slide = 0 : slide + 1)

  }
  const handlePrevSlide = () => {
      setSlide((slide) => slide === 0 ? slide = 6 : slide - 1)
  }

  const getLocation = async(uid) =>  {
    const querySnapshot = await getDocs(collection(db, `/Clientes/${uid}/Favoritos`));
     // console.log(querySnapshot);
                setFavLocations(querySnapshot.docs.map(doc => ({id: doc.id,...doc.data()}) ))
           //    console.log(favLocations);
             
              
              }


useEffect(() => {
  
getLocation(uid)


}, [uid])


  // const arrCitys = ["Cordoba", "Rosario", "Buenos Aires", "Posadas", "Resistencia"]

  


  return (
    <div className='fav_locations_container'>
      <div style={{display: "flex", justifyContent: "space-around", marginBottom: "10px", width: "60%"}}>
        <h5 style={{color: "#625B71"}}>Mis direcciones frecuentes</h5>
        

        <GetFavLocations uid={uid}/>
        
        
        <div className='arrows_container'> 
          <button className='arrows' onClick={()=>handlePrevSlide()}><img src="./iconos/left_arrow.png" alt="Deslizar a  la izquierda" /></button>
          <button className='arrows' onClick={()=>handleNextSlide()}><img src="./iconos/right_arrow.png" alt="Deslizar a  la derecha" /></button>
        </div>

     


      {/* <button onClick={()=>getLocation(uid)}>Get loc</button> */}
      </div>

      
        <div className="fav_locations container"  style={{ transform: `translateX(-${slide * 10}%`}}>
          {
           favLocations && favLocations.map(element => (
              
              <FavLocationItems city={element.cityName} key={element.id} uid={uid}/>
            ))
          }
            
        </div>
        </div>
  )
}

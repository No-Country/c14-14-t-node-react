import React, { useContext, useEffect, useState } from 'react'
import { FavLocationItems } from './FavLocationItems'
import './locations.css'
import { UserContext } from '../../context/userContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseConfig/firebase'
import { GetFavLocations } from './helpers/GetFavLocations'

export const FavLocationsContainer = ({data, onCardClick}) => {
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
    setFavLocations(querySnapshot.docs.map(doc => ({id: doc.id,...doc.data()}) ))
  }

  useEffect(() => {
    getLocation(uid)
  }, [uid])

  return (
    <div className='fav_locations_container'>
      <div className="arrows_h5_container" >
        <div>
          <h5 style={{color: "#625B71"}}>Mis direcciones frecuentes</h5> 
        </div>
        <div>
          <GetFavLocations uid={uid}/>
        </div>
        <div className='arrows_container_2'> 
          <button className='arrows' onClick={()=>handlePrevSlide()}><img src="./iconos/left_arrow.png" alt="Deslizar a  la izquierda" /></button>
          <button className='arrows' onClick={()=>handleNextSlide()}><img src="./iconos/right_arrow.png" alt="Deslizar a  la derecha" /></button>
        </div>
      </div>
      <div className="fav_locations container mb-5"  style={{ transform: `translateX(-${slide * 10}%`}}>
        {
          favLocations && favLocations.map(element => (
            <FavLocationItems onCardClick={onCardClick} city={element.cityName} key={element.id} uid={uid}/>
          ))
        }
      </div>
    </div>
  )
}

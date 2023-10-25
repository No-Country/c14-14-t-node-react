import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useFetch } from '../Hooks/useFetch'

export const HoursCards = ({data}) => {
  // new Date().getHours()
  const [slide, setSlide] = useState(0)

  const handleNextSlide = () => {

    setSlide((slide) => slide === 7 ? slide = 0 : slide + 1)

  }
  const handlePrevSlide = () => {
    setSlide((slide) => slide === 0 ? slide = 7 : slide - 1)
  }



    // const sliceString = () => {

    // }
  
  return (
    <div className='hoursCards_container container' >
    
  <div  style={{ transform: `translateX(-${slide * 10}%`, display: "flex", gap: "10px" }}  >
      {
        (data !== undefined) ? 
            data.forecast.forecastday[0].hour.map((element,index) => (

            <div key={index} className= 'hoursCard_item'> 
                <span>{element.time.slice(11,13)} hs</span>
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
    <div className='arrows_container'>
        <button onClick={handlePrevSlide}  className='arrows'>←</button>
        <button onClick={handleNextSlide}  className='arrows'>→</button>
      
    </div>
    </div>
  )
}

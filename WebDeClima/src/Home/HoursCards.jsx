

export const HoursCards = ({data,slide}) => {
  // new Date().getHours()
  



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
   
    </div>
  )
}

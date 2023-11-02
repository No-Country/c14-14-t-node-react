import React from 'react'
import { HoursCards } from './HoursCards'
import { HomeMap } from './HomeMap'
import { OtherInfo } from './OtherInfo'
import { AddFavBtn } from './FavLocations/Buttons/AddFavBtn'
import { DelFavBtn } from './FavLocations/Buttons/DelFavBtn'
import Forecast from '../Forecast'
import { DaysCards } from './DaysCards'
import { Spinner } from './Spinner/Spinner'

const OtherLocationWeather = ({ currentWeatherData, city, showDays, handleSliders, handlePrevSlide, handleNextSlide, slide, formatLocalTime, corazonState, signedUser, toggleForecastCollapse, isForecastCollapsed}) => {
  return (
    <div>
                    <div>
                        { currentWeatherData ? (
                            <div className="forecast_container">
                                <img src={currentWeatherData.forecast.forecastday[0].day.condition.icon} alt="icon-forecast" className="icon_forecast"/>
                                <div className="d-flex justify-content-around w-50">
                                    <h2>{formatLocalTime(currentWeatherData.location.localtime)}</h2>
                                </div>
                                <div> 
                                    <h5>{currentWeatherData.location.name}, {currentWeatherData.location.region}</h5>
                                </div>                  
                                <div>
                                    <span style={{fontSize: "30px"}}>{currentWeatherData.current.temp_c}</span>
                                    <span> ºC</span>  
                                </div>
                                <span style={{color: "orange"}}>{currentWeatherData.forecast.forecastday[0].day.condition.text}</span>                       
                                <div className="d-flex flex-column ">
                                    <span style={{marginRight: "5px"}}>min:  {currentWeatherData.forecast.forecastday[0].day.mintemp_c} ºC </span>
                                    <span>max: {currentWeatherData.forecast.forecastday[0].day.maxtemp_c} ºC </span>
                                </div>
                                <span>{currentWeatherData.location.localtime}</span>
                               
                                <div className="corazon_container" onClick={()=>setCorazonState(!corazonState)}>
                                    { corazonState ?
                                        <DelFavBtn
                                            uid={signedUser.uid}
                                            cityName={currentWeatherData ? currentWeatherData.location.name : "Posadas"}
                                        />
                                        :
                                        <AddFavBtn
                                            uid={signedUser.uid}
                                            cityName={currentWeatherData ? currentWeatherData.location.name : "Posadas"}
                                        />
                                    } 
                                </div>
                            </div>
                        ) : "No se encontro informacion"}    
                    </div>
                    <div className="days_arrows_container">
                        <div className="days_container">
                            <span className={showDays ? "disable_days" : "active_days"} onClick={handleSliders}>Hoy</span>
                            <span className={showDays ? "active_days" : "disable_days"}  onClick={handleSliders}>10 dias</span>
                        </div>
                        <div className='arrows_container'>
                                <button onClick={handlePrevSlide} className='arrows'><img src="./iconos/left_arrow.png" alt="Deslizar a  la izquierda" /></button>
                                <button onClick={handleNextSlide} className='arrows'><img src="./iconos/right_arrow.png" alt="Deslizar a la derecha" /></button>
                        </div>
                    </div>
                    <hr />
                    <div style={{ marginBottom: "2%" }}>
                        
                        { showDays ? 
                            <div className='forecastCards'>
                                <DaysCards
                                    city={currentWeatherData ? currentWeatherData.location.name: "Buenos Aires"}
                                    slide={slide}
                                />
                            </div>
                            :
                            <div className='forecastCards'>
                                <HoursCards
                                    data={currentWeatherData}
                                    slide={slide}
                                />
                            </div>
                        }
                            <div>
                                <button
                                    className="btn btn-outline-dark buttonHover rounded-pill mt-3"
                                    type="button"
                                    onClick={toggleForecastCollapse}
                                >
                                    Ver Pronóstico Extendido
                                </button>
                                <div className={`collapse ${isForecastCollapsed ? '' : 'show'}`} id="collapseExample">
                                    <div className="card card-body forecastContainer">
                                        <Forecast city={city} />
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="section_map_other">
                        <HomeMap/>
                        <OtherInfo data={currentWeatherData} />
                    </div>
                </div>  
  )
}

export default OtherLocationWeather
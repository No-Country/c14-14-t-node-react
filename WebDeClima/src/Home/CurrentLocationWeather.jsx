import React from 'react'
import { HoursCards } from './HoursCards'
import { HomeMap } from './HomeMap'
import { OtherInfo } from './OtherInfo'
import { AddFavBtn } from './FavLocations/Buttons/AddFavBtn'
import { DelFavBtn } from './FavLocations/Buttons/DelFavBtn'
import Forecast from '../Forecast'
import { DaysCards } from './DaysCards'

const CurrentLocationWeather = ({data, showDays, handleSliders, handlePrevSlide, handleNextSlide, slide, formatLocalTime, corazonState, signedUser, toggleForecastCollapse, isForecastCollapsed}) => {
   
  return (
    <div className="w-100">
        <div className="currentWeather">
            {
               data !== undefined ? (
                    <div className="forecast_container">
                        <img src={data.forecast.forecastday[0].day.condition.icon}  alt="icon-forecast" className="icon_forecast"/>
                        <div className="d-flex justify-content-around w-50">
                            <h5>{formatLocalTime(data.location.localtime)}</h5>
                        </div>
                        <div> 
                            <h3>{data.location.name}, {data.location.region}</h3>
                        </div>
                        <div>
                            <h1>{data.current.temp_c} ºC</h1>
                        </div>
                        <p className="m-0 p-0">{data.forecast.forecastday[0].day.condition.text}</p>
                        <div className="d-flex flex-column m-0 p-0">
                            <p className="m-0 p-0">Máxima: {data.forecast.forecastday[0].day.maxtemp_c}ºC Mínima: {data.forecast.forecastday[0].day.mintemp_c}ºC</p>
                        </div>
                        <div className="corazon_container" onClick={()=>setCorazonState(!corazonState)}>
                            { corazonState ?
                                <DelFavBtn
                                    uid={signedUser.uid}
                                    cityName={data.location.name}
                                />
                                :
                                <AddFavBtn
                                    uid={signedUser.uid}
                                    cityName={data.location.name}
                                />
                            } 
                        </div>
                    </div>
                ) : "No se encontro informacion"}   
        </div>
                    <div className="days_arrows_container">
                        <div className="days_container">
                            <span className={showDays ? "disable_days me-1" : "active_days"} onClick={handleSliders}>Hoy</span>
                            <span className={showDays ? "active_days me-1" : "disable_days"}  onClick={handleSliders}>10 dias</span>
                        </div>
                        <div className='arrows_container'>
                            <button onClick={handlePrevSlide} className='arrows'><img src="./iconos/left_arrow.png" alt="Deslizar a  la izquierda" /></button>
                            <button onClick={handleNextSlide} className='arrows'><img src="./iconos/right_arrow.png" alt="Deslizar a la derecha" /></button>
                        </div>
                    </div>
                    <div className="lineHome"></div>
                    <div className="m-5 w-100">
                        { showDays ? 
                            <DaysCards
                                city={data.location.name}
                                slide={slide}
                            />
                            :
                            <HoursCards
                                data={data}
                                slide={slide}
                            />
                        }
                        {data && data.location && (
                            <div className='collapseForecast'>
                                <button
                                    className="btn btn-outline-dark buttonHover rounded-pill mt-3"
                                    type="button"
                                    onClick={toggleForecastCollapse}
                                >
                                    Ver Pronóstico Extendido
                                </button>
                                <div className={`collapse ${isForecastCollapsed ? '' : 'show'}`} id="collapseExample">
                                <div className="card card-body forecastContainer">
                                    <Forecast city={data.location.name} />
                                </div>
                                </div>
                            </div>
                        )}
                    </div>
        <div className="section_map_other">
                <HomeMap/> 
            <OtherInfo data={data} />
        </div>
    </div>
  )
}

export default CurrentLocationWeather
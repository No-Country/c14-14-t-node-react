import React from 'react';

export const OtherInfo = ({ data }) => {
  return (
    <div style={{ width: "60%", marginTop: "15px" }}>
      {data && data.forecast && data.forecast.forecastday && data.forecast.forecastday[0] && data.forecast.forecastday[0].astro ? (
        <div className='other_info_container'>
          <div className='other_info_item'>
            <img src="./iconos/indice_uv.png" alt="" />
            <span>Indice UV</span>
            <span>{data.current.uv} - Atmo</span>
          </div>

          <div className='other_info_item'>
            <img src="./iconos/amanecer.png" alt="" />
            <span>Amanecer</span>
            <span>{data.forecast.forecastday[0].astro.sunrise}</span>
          </div>

          <div className='other_info_item'>
            <img src="./iconos/atardecer.png" alt="" />
            <span>Atardecer</span>
            <span>{data.forecast.forecastday[0].astro.sunset}</span>
          </div>

          <div className='other_info_item'>
            <img src="./iconos/sensacion_termica.png" alt="" />
            <span>Sensacion Termica</span>
            <span>{data.current.feelslike_c} %</span>
          </div>

          <div className='other_info_item'>
            <img src="./iconos/humedad.png" alt="" />
            <span>Humedad</span>
            <span>{data.current.humidity} %</span>
          </div>

          <div className='other_info_item'>
            <img src="./iconos/precipitacion.png" alt="" />
            <span>Precipitacion</span>
            <span>{data.current.precip_in} %</span>
          </div>

          <div className='other_info_item'>
            <img src="./iconos/viento.png" alt="" />
            <span>Viento</span>
            <span>{data.current.wind_kph} kph</span>
          </div>

          <div className='other_info_item'>
            <img src="./iconos/visibilidad.png" alt="" />
            <span>Visibilidad</span>
            <span>{data.current.vis_km} km</span>
          </div>
        </div>
      ) : (
        ""
      )}
      <div></div>
    </div>
  );
};

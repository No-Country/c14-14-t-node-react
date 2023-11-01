import { Spinner } from "./Spinner/Spinner";

export const HoursCards = ({data,slide}) => {
    return (
      <div className='hoursCards_container container-fluid'>
        <div style={{ transform: `translateX(-${slide * 10}%)`, display: "flex", gap: "10px" }}>
          {data && data.forecast && data.forecast.forecastday && data.forecast.forecastday[0] && data.forecast.forecastday[0].hour ? (
            data.forecast.forecastday[0].hour.map((element, index) => (
              <div key={index} className='hoursCard_item m-2' style={{ height: "200px", width: "150px"}}>
                <h4>{element.time.slice(11, 13)} hs</h4>
                <img src={element.condition.icon} alt="" />
                <div>
                  <h4>{element.temp_c} ºC</h4>
                </div>
              </div>
            ))
          ) : (
            <Spinner/>
          )}
        </div>
      </div>
    );
  };


/* import { Spinner } from "./Spinner/Spinner";

export const HoursCards = ({data, slide}) => {
    return (
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
        
        <div class="carousel-inner d-flex">
            {data && data.forecast && data.forecast.forecastday && data.forecast.forecastday[0] && data.forecast.forecastday[0].hour ? (
                    data.forecast.forecastday[0].hour.map((element, index) => (
                      <div key={index} className='carousel-item active' >
                        <div className="cards">
                        <h4>{element.time.slice(11, 13)} hs</h4>
                        <img src={element.condition.icon} alt="" />
                        <div>
                          <h3>{element.temp_c} ºC</h3>
                        </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Spinner/>
                  )}
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    ); */
  //};

  

      {/* <div className='hoursCards_container container-fluid justify-content-center w-100'>
        <div className='justify-content-between' style={{ transform: `translateX(-${slide * 10}%)`, display: "flex", gap: "10px" }}>
          {data && data.forecast && data.forecast.forecastday && data.forecast.forecastday[0] && data.forecast.forecastday[0].hour ? (
            data.forecast.forecastday[0].hour.map((element, index) => (
              <div key={index} className='hoursCard_item' style={{ height: "200px", width: "150px"}}>
                <h4>{element.time.slice(11, 13)} hs</h4>
                <img src={element.condition.icon} alt="" />
                <div>
                  <h3>{element.temp_c} ºC</h3>
                </div>
              </div>
            ))
          ) : (
            <Spinner/>
          )}
        </div>
      </div> */}
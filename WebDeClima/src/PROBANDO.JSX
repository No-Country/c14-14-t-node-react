

const Forecast = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();


  // Function to group weather data by day
  const groupWeatherDataByDay = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const date = item.dt_txt.split(' ')[0]; // Extract the date part
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    return groupedData;
  };

  return (
    <>
      {loading ? (
        <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
          <div>Cargando...</div>
        </div>
      ) : (
        <div className="container">
          {Object.entries(groupWeatherDataByDay(weatherData)).map(
            ([date, dayData]) => (
              <div key={date} className="mt-3">
                <div className="card p-3 shadow border-0 mt-3 rounded" style={{ background: 'transparent' }}>
                  <div className="d-flex" style={{ width: '100%' }}>
                    <div style={{ width: '30%' }}>
                      <h3>{new Date(date).toLocaleDateString('es-ES', { weekday: 'long' })}</h3>
                      <p>{new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</p>
                    </div>

                    
                    <div className="row" style={{ width: '70%' }}>
                      <div id={`carousel-${date}`} className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                          {dayData.map((item, index) => (
                            <div
                              key={index}
                              className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            >
                              <div className="d-flex justify-content-around" style={{ width: '100%' }}>
                                <div style={{ width: '30%' }}>
                                  <div>{item.dt_txt.split(' ')[1]}</div>
                                  <div>
                                    Temperatura: {item.main.temp} {unitTypeSymbol[unitType]}
                                  </div>
                                  <div>
                                    Sensación térmica {item.main.feels_like} {unitTypeSymbol[unitType]}
                                  </div>
                                </div>
                                <div style={{ width: '30%' }} className="text-center">
                                  <img
                                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                    alt="Weather Icon"
                                  />
                                </div>
                                <div style={{ width: '30%' }}>
                                  <div>{item.weather[0].main}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target={`#carousel-${date}`}
                          data-bs-slide="prev"
                        >
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target={`#carousel-${date}`}
                          data-bs-slide="next"
                        >
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Forecast;
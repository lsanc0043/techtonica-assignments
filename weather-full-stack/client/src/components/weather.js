import { useEffect, useState } from "react";

const Weather = ({ coord }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState({});

  const loadData = () => {
    const paramsString = `lat=${coord[0]}&lon=${coord[1]}`;
    const params = new URLSearchParams(paramsString);
    // console.log(params);
    fetch(`http://localhost:8080/api/weather?${params}`)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          // console.log(data);
          setCity(data);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [coord]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="card" style={{ display: "inline-block", width: "30vw" }}>
        <h5 className="card-title p-2">{city.name}</h5>
        <h5>
          Latitude: {coord[0]} Latitude: {coord[1]}
        </h5>
        <img
          src={
            "http://openweathermap.org/img/wn/" +
            city.weather[0].icon +
            "@4x.png"
          }
          className="card-img-top"
          alt=""
        />
        <div className="card-body">
          <h3 className="card-title">{city.weather[0].main}</h3>
          <p className="card-text">{city.weather[0].description}</p>
          <p className="card-text">
            High {city.main.temp_max}&deg;F Low {city.main.temp_min} &deg;F
          </p>
          <p className="card-text">Feels like {city.main.feels_like}&deg;F</p>
          <p className="card-text">Pressure {city.main.pressure} mb</p>
          <p className="card-text">Humidity {city.main.humidity} %</p>
        </div>
      </div>
    );
  }
};

export default Weather;

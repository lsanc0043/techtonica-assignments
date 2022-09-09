import { useEffect, useState } from "react";

const Weather = ({ coord }) => {
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState(null);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const paramsString = `lat=${coord[0]}&lon=${coord[1]}`;
      const params = new URLSearchParams(paramsString);
      fetch(`http://localhost:8080/api/weather?${params}`)
        .then((res) => res.json())
        .then((data) => {
          // setIsLoaded(true);
          // console.log(data);
          setCity(data);
          const riseTime = new Date(data.sys.sunrise * 1000);
          const setTime = new Date(data.sys.sunset * 1000);
          setSunrise(riseTime.toLocaleTimeString());
          setSunset(setTime.toLocaleTimeString());
          // }
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          // resource: https://reactjs.org/docs/faq-ajax.html
          // (error) => {
          //   setIsLoaded(true);
          //   setError(error);
        });
    };
    loadData();
    // eslint-disable-next-line
  }, [coord]);

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div>Loading...</div>;
  // } else {
  if (!city) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="card" style={{ display: "inline-block", width: "30vw" }}>
        <h3 className="card-title p-2">{city.name}</h3>
        <p>
          <strong>Latitude: </strong> {coord[0]} <br />
          <strong>Longitude: </strong> {coord[1]}
        </p>
        <img
          style={{ height: "20vh", width: "20vh" }}
          src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`}
          className="card-img-top"
          alt={city.weather[0].description}
        />
        <div className="card-body">
          <h3 className="card-title">{city.main.temp}&deg;F</h3>
          <h3 className="card-title">{city.weather[0].main}</h3>
          <p className="card-text">
            <strong>Description: </strong> {city.weather[0].description}
          </p>
          <p className="card-text">
            <strong>High is:</strong> {city.main.temp_max}&deg;F <br />
            <strong>Low is:</strong> {city.main.temp_min} &deg;F
          </p>
          <p className="card-text">
            <strong>Sunrise at:</strong> {sunrise} PST
            <br />
            <strong>Sunset at:</strong> {sunset} PST
          </p>
        </div>
      </div>
    );
  }
};

export default Weather;

import { useState } from "react";
import Weather from "./weather";

const CityForm = () => {
  const [latitude, setLat] = useState(0);
  const [longitude, setLon] = useState(0);
  const [coord, setCoord] = useState([0, 0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCoord([latitude, longitude]);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="lat">Enter Latitude:</label>
        <input
          type="text"
          name="lat"
          id="lat"
          size="10"
          val={latitude}
          onChange={(e) => setLat(e.target.value)}
        />
        <label htmlFor="lon">Enter Longitude:</label>
        <input
          type="text"
          name="lon"
          id="lon"
          size="10"
          val={longitude}
          onChange={(e) => setLon(e.target.value)}
        />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
      <Weather coord={coord} />
    </div>
  );
};

export default CityForm;

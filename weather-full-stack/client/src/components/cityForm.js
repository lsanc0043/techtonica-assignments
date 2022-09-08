import { useState } from "react";

const CityForm = ({ coordDataToParent }) => {
  const [latitude, setLat] = useState(0);
  const [longitude, setLon] = useState(0);
  const [error, setError] = useState("");

  const loadData = (input) => {
    fetch("http://localhost:8080/api/coords")
      .then((res) => res.json())
      .then((data) => {
        coordDataToParent(data[input]);
      });
  };

  const handleOptSubmit = (e) => {
    const city = e.target.value;
    loadData(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Number(latitude) < -90 ||
      Number(latitude) > 90 ||
      Number(longitude) < -180 ||
      Number(longitude) > 180
    ) {
      setError(
        "Please enter a value for latitude between -90 and 90 and a value for longitude between -180 and 180."
      );
    } else {
      setError("");
      coordDataToParent([latitude, longitude]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="lat">Latitude:</label>
        <input
          type="text"
          name="lat"
          id="lat"
          placeholder="Between -90 and 90"
          val={latitude}
          onChange={(e) => setLat(e.target.value)}
        />
        <label htmlFor="lon">Longitude:</label>
        <input
          type="text"
          name="lon"
          id="lon"
          placeholder="Between -180 and 180"
          val={longitude}
          onChange={(e) => setLon(e.target.value)}
        />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
      <p>{error}</p>
      <label>
        Choose a city:
        <select onChange={handleOptSubmit}>
          <option value="Globe">--Default--</option>
          <option>Los Angeles</option>
          <option>Oakland</option>
          <option>Sacramento</option>
          <option>Austin</option>
          <option>New York</option>
          <option>Dallas</option>
          <option>Chicago</option>
        </select>
      </label>
    </div>
  );
};

export default CityForm;

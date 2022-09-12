import "./App.css";
import { useState } from "react";
import CityForm from "./components/cityForm";
import Weather from "./components/weather";

function App() {
  const [coordData, setCoordData] = useState([0, 0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const coordDataFromChild = (childData) => {
    setCoordData(childData);
  };

  const timer = () => {
    let date = new Date();
    setTime(date.toLocaleTimeString());
  };

  setInterval(timer, 1000);

  return (
    <div className="App">
      <h1>Check the Weather!</h1>
      <p>Time right now: {time} PST</p>
      <CityForm coordDataToParent={coordDataFromChild} />
      <Weather coord={coordData} />
    </div>
  );
}

export default App;

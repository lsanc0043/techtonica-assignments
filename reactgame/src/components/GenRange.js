import React, { useState } from "react";
import GenForm from "./GenForm";

const GenRange = (props) => {
  // allows access to input value
  let lowerBound = React.createRef();
  let upperBound = React.createRef();

  const [message, setMessage] = useState("");
  const [lower, setLower] = useState(0);
  const [upper, setUpper] = useState(100);
  const random = Math.floor(Math.random() * (upper - lower) + lower);
  // eslint-disable-next-line
  const [randNum, setRandNum] = useState(0);

  const handleClick = () => {
    if (
      isNaN(lowerBound.current.value) ||
      lowerBound.current.value === "" ||
      isNaN(upperBound.current.value) ||
      upperBound.current.value === ""
    ) {
      setMessage("Please enter a number.");
    } else {
      let lowerVal = Number(lowerBound.current.value);
      let upperVal = Number(upperBound.current.value);
      if (lowerVal > upperVal) {
        setMessage("Lower bound cannot be greater than upper bound.");
      } else {
        setMessage("");
        setRandNum(random);
        setLower(lowerVal);
        setUpper(upperVal);
      }
    }
  };

  return (
    <div>
      <label htmlFor="min">Between: </label>
      <input type="text" ref={lowerBound} id="min" size="4" />
      <label htmlFor="max"> and:</label>
      <input type="text" ref={upperBound} id="max" size="4" />
      <button onClick={handleClick}>Go!</button>
      <p>{message}</p>
      <GenForm min={lower} max={upper} answer={random} />
    </div>
  );
};

export default GenRange;

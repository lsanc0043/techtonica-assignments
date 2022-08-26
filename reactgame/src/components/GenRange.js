import React, { useState } from "react";
import GenForm from "./GenForm";

const GenRange = (props) => {
  // allows access to input value

  const [message, setMessage] = useState("");
  const [lower, setLower] = useState(0);
  const [upper, setUpper] = useState(100);
  const random = Math.floor(Math.random() * (upper - lower) + lower);
  // eslint-disable-next-line
  const [randNum, setRandNum] = useState(0);

  const onGo = (lower, upper) => {
    if (
      isNaN(lower) ||
      lower === "" ||
      isNaN(upper) ||
      upper === ""
    ) {
      setMessage("Please enter a number.");
    } else {
      let lowerVal = Number(lower);
      let upperVal = Number(upper);
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
      <Range onGo={onGo} />
      <p>{message}</p>
      <GenForm min={lower} max={upper} answer={random} />
    </div>
  );
};

function Range(props) {
  const { onGo } = props;
  const [lower, setLower] = useState(0);
  const [upper, setUpper] = useState(100);
  const onClick = () => {
    onGo(lower, upper);
  };
  return (
    <div>
      <label htmlFor="min">Between: </label>
      <input
        type="text"
        onChange={(e) => setLower(e.target.value)}
        id="min"
        size="4"
      />
      <label htmlFor="max"> and:</label>
      <input
        type="text"
        onChange={(e) => setUpper(e.target.value)}
        id="max"
        size="4"
      />
      <button onClick={onClick}>Go!</button>
    </div>
  );
}

export default GenRange;

import React, { useState } from "react";

const GenForm = (props) => {
  let inputNum = React.createRef();
  const [guessList, setGuessList] = useState([]);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const [leftBound, setLeftBound] = useState(props.min);
  const [rightBound, setRightBound] = useState(props.max);

  const handleClick = () => {
    if (isNaN(inputNum.current.value) || inputNum.current.value === "") {
      setMessage("Please enter a number.");
    } else {
      let inputVal = Number(inputNum.current.value);
      if (inputVal < props.min || inputVal > props.max) {
        setMessage("Out of Bounds! Try again.");
      } else {
        setMessage("");
        guessList.push(inputVal);
        console.log(guessList);
        setCount(count + 1);
        if (inputVal > props.answer) {
          setRightBound(inputVal);
          setMessage("Go down!");
        } else if (inputVal < props.answer) {
          setLeftBound(inputVal);
          setMessage("Go up!");
        } else {
          setMessage("Perfect! You got it!");
        }
      }
    }
  };

  const handleReset = () => {
    setMessage("");
    setCount(0);
  };

  return (
    <div>
      <p>
        The number is between <strong>{props.min}</strong> and{" "}
        <strong>{props.max}</strong>
      </p>
      <input ref={inputNum} type="text" id="message" />
      <button onClick={handleClick}>Submit</button>
      <button onClick={handleReset}>Reset Game!</button>
      <p>Number of Guesses: {count}</p>
      <p>{message}</p>
      <label>
        Between {props.min}
        <div
          className="slider"
          style={{ width: Math.floor(props.max - props.min) / 8 }}
        ></div>
        and {props.max}
      </label>

      <p>Guesses Made So Far:</p>
      <ul style={{ listStyle: "none" }}>
        {guessList.map((guess, index) => (
          <li key={index}>{guess}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenForm;

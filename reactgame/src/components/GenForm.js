import React, { useState } from "react";

const GenForm = (props) => {
  let inputNum = React.createRef();
  const [guessList, setGuessList] = useState([]);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const [leftBound, setLeftBound] = useState(0);
  const [rightBound, setRightBound] = useState(0);

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
        setCount(count + 1);
        if (inputVal > props.answer) {
          console.log(leftBound);
          console.log(rightBound);
          setRightBound(inputVal);
          setMessage("Go down!");
        } else if (inputVal < props.answer) {
          console.log(leftBound);
          console.log(rightBound);
          setLeftBound(inputVal);
          setMessage("Go up!");
        } else {
          setMessage("Perfect! You got it!");
        }
      }
    }
  };

  // console.log(leftBound);
  // console.log(rightBound);

  const handleReset = () => {
    setMessage("");
    setGuessList([]);
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

import { useState } from "react";
import GenForm from "./GenForm";

const GenRandom = () => {
  function randomize(num1, num2) {
    return Math.floor(Math.random() * (num2 - num1) + num1);
  }

  const randNum1 = randomize(0, 10000);
  const randNum2 = randomize(0, 10000);
  const min = Math.min(randNum1, randNum2);
  const max = Math.max(randNum1, randNum2);
  const random = randomize(min, max);

  // eslint-disable-next-line
  const [randNum, setRandNum] = useState(0);

  const handleClick = () => {
    setRandNum(random);
  };

  return (
    <div>
      <button onClick={handleClick}>Randomize!</button>
      <GenForm min={min} max={max} answer={random} />
    </div>
  );
};

export default GenRandom;

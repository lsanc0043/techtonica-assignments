import { useEffect, useState } from "react";
import Move from "./Move";

const GenSnakeGame = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    outOfTime();
    if (timeOver === false) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  function outOfTime() {
    if (timeLeft === 0) {
      setTimeOver(true);
      return "true";
    }
  }

  const handleRestart = () => {
    window.location.reload(false);
  };

  return (
    <div className="snakeGame">
      <h1>snake game?</h1>
      <p>
        You have <strong>{timeLeft}</strong> seconds left.
      </p>
      <Move outOfTime={timeOver} />
      <button
        onClick={handleRestart}
        style={{ display: timeOver ? "inline-block" : "none" }}
      >
        Restart!
      </button>
    </div>
  );
};

export default GenSnakeGame;

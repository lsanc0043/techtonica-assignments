import { useState } from "react";

const RandFood = (props) => {
  const [foodTop, setFoodTop] = useState(0);
  const [foodLeft, setFoodLeft] = useState(0);
  const [score, setScore] = useState(-1);
  const [colorOfFood, setColor] = useState("blue");

  function randomizeFood() {
    let negOrPos1 = Math.random() < 0.5 ? -1 : 1;
    let negOrPos2 = Math.random() < 0.5 ? -1 : 1;
    let randTop = Math.floor((Math.random() * 38) / 4) * negOrPos1 * 20;
    let randLeft = Math.floor((Math.random() * 58) / 4) * negOrPos2 * 20;
    setFoodTop(randTop);
    setFoodLeft(randLeft);
  }

  function eatFood() {
    if (foodTop === props.snakeTop && foodLeft === props.snakeLeft) {
      randomizeFood();
      setColor(
        "#" + (((1 + Math.random()) * (1 << 24)) | 0).toString(16).substr(-6)
      );
      setScore(score + 1);
    }
  }
  eatFood();

  return (
    <div>
      <div
        className="snake"
        style={{
          position: "relative",
          backgroundColor: `${colorOfFood}`,
          borderRadius: "50%",
          border: "solid",
          top: foodTop + "px",
          left: foodLeft - 20 + "px",
        }}
      ></div>
      <p
        style={{
          position: "fixed",
          display: "inline-block",
          top: "50vh",
          left: "20vw",
          fontSize: "150%",
        }}
      >
        You've eaten the food{" "}
        <span style={{ color: "red" }}>
          <strong>{score}</strong>
        </span>{" "}
        times!
      </p>
    </div>
  );
};

export default RandFood;

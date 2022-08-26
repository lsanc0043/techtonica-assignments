import { useState } from "react";

const RandFood = (props) => {
  const [foodTop, setFoodTop] = useState(0);
  const [foodLeft, setFoodLeft] = useState(0);

  function randomizeFood() {
    let negOrPos1 = Math.random() < 0.5 ? -1 : 1;
    let negOrPos2 = Math.random() < 0.5 ? -1 : 1;
    let randTop = Math.floor(Math.random() * 38) * negOrPos1 * 5;
    let randLeft = Math.floor(Math.random() * 58) * negOrPos2 * 5;
    setFoodTop(randTop);
    setFoodLeft(randLeft);
  }

  function eatFood() {
    if (foodTop === props.snakeTop && foodLeft === props.snakeLeft) {
      randomizeFood();
    }
  }
  eatFood();
  return (
    <div>
      <div
        className="snake"
        style={{
          position: "relative",
          backgroundColor: "blue",
          borderRadius: "50%",
          top: foodTop + "px",
          left: foodLeft - 20 + "px",
        }}
      ></div>
      <button
        style={{ position: "fixed", top: "300px", left: "350px" }}
        onClick={randomizeFood}
      >
        Generate Food!
      </button>
    </div>
  );
};

export default RandFood;

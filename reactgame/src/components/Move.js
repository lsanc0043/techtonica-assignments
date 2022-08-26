import React, { useEffect, useState } from "react";
import RandFood from "./RandFood";

const Move = (props) => {
  const [countLeft, setCountLeft] = useState(0);
  const [countUp, setCountUp] = useState(0);
  const [countRight, setCountRight] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [edgeMessage, setEdgeMessage] = useState("");
  const [atEdge, setAtEdge] = useState("none");

  useEffect(() => {
    const interval = setInterval(() => {
      document.addEventListener(
        "keydown",
        function (event) {
          switch (event.key) {
            case "ArrowLeft":
              setCountLeft(countLeft + 1);
              break;
            case "ArrowUp":
              setCountUp(countUp + 1);
              break;
            case "ArrowRight":
              setCountRight(countRight + 1);
              break;
            case "ArrowDown":
              setCountDown(countDown + 1);
              break;
            default:
              break;
          }
        },
        10
      );
    });
    return () => clearInterval(interval);
  });

  function handleClick() {
    setEdgeMessage("");
    setAtEdge("none");
  }

  function isEdge() {
    if (
      Math.abs((countRight + 4 - (countLeft + 6)) * 5) > 290 ||
      Math.abs((countDown - countUp) * 5) > 190
    ) {
      setEdgeMessage("You touched the edge! You lose:(");
      setAtEdge("inline-block");
      console.log((countDown - countUp) * 5);
      console.log((countRight - countLeft) * 5);
      setCountLeft(0);
      setCountUp(0);
      setCountRight(0);
      setCountDown(0);
    }
  }

  let topPix = (countDown - countUp) * 5;
  let leftPix = (countRight - countLeft) * 5;
  isEdge();

  return (
    <div>
      <div className="box">
        <div
          className="snake"
          style={{
            top: topPix + "px",
            left: leftPix + "px",
          }}
        ></div>
        <RandFood snakeTop={topPix} snakeLeft={leftPix} />
      </div>
      <div>
        <button style={{ display: atEdge }} onClick={handleClick}>
          Restart
        </button>
        <p>{edgeMessage}</p>
      </div>
    </div>
  );
};

export default Move;

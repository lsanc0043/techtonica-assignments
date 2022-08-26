import React, { useEffect, useState } from "react";
import RandFood from "./RandFood";

const Move = (props) => {
  const [countLeft, setCountLeft] = useState(0);
  const [countUp, setCountUp] = useState(0);
  const [countRight, setCountRight] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [edgeMessage, setEdgeMessage] = useState("");
  const [atEdge, setAtEdge] = useState("none");

  // function isEdge() {
  //   if (
  //     (countRight - countLeft) * 5 < -280 ||
  //     (countRight - countLeft) * 5 > 300 ||
  //     Math.abs((countDown - countUp) * 5) > 190
  //   ) {
  //     setEdgeMessage("You touched the edge! You lose:(");
  //     setAtEdge("inline-block");
  //     setCountLeft(0);
  //     setCountUp(0);
  //     setCountRight(0);
  //     setCountDown(0);
  //   }
  // }

  useEffect(() => {
    timeOut();
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

  // isEdge();

  function timeOut() {
    if (props.outOfTime === true) {
      setCountLeft(0);
      setCountUp(0);
      setCountRight(0);
      setCountDown(0);
    }
  }

  function handleClick() {
    setEdgeMessage("");
    setAtEdge("none");
  }

  let topPix = (countDown - countUp) * 20;
  let leftPix = (countRight - countLeft) * 20;

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
        <RandFood snakeTop={topPix} snakeLeft={leftPix} outOfTime={props.outOfTime}/>
      </div>
      <div>
        <button style={{ display: atEdge }} onClick={handleClick}>
          Restart
        </button>
        <p>{edgeMessage}</p>
      </div>

      {/* <div>
        <p>
          top index: {topPix} left index: {leftPix}
        </p>
        <p>
          top {countUp} down {countDown} left {countLeft} right {countRight}
        </p>
        <p>
          edgeCheck {(countDown - countUp) * 5};{(countRight - countLeft) * 5}
        </p>
      </div> */}
    </div>
  );
};

export default Move;

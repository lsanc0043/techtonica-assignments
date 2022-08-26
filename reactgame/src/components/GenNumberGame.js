import { useState } from "react";
import GenRandom from "./GenRandom";
import GenRange from "./GenRange";

const GenNumberGame = () => {
  const [showRange, setShowRange] = useState("none");
  const [showRand, setShowRand] = useState("none");

  const showHide = () => {
    setShowRange("block");
    setShowRand("none");
  };

  const getRandom = () => {
    setShowRand("block");
    setShowRange("none");
  };
  return (
    <div>
      <h1>Can you guess the number?</h1>

      <button onClick={showHide}>Choose your Own Range!</button>
      <button onClick={getRandom}>Get a Random Number!</button>

      <div style={{ display: showRange }}>
        <GenRange />
      </div>

      <div style={{ display: showRand }}>
        <GenRandom />
      </div>
    </div>
  );
};

export default GenNumberGame;

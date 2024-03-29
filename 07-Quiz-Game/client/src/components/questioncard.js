import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const QuestionCard = ({
  question,
  userAnswer,
  correctAnswer,
  current,
  length,
}) => {
  const [options, setOptions] = useState([]); // entire list of answers including the correct answer - array
  const [selected, setSelected] = useState(false); // is the button selected? - boolean
  const [confetti, setConfetti] = useState(false); // is the answer correct? confetti!! - boolean

  // decodes special characters
  function decodeHtml(html) { 
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  // gets a random number and inserts the correct answer in that position
  const randomize = (array, correct) => {
    const arrCopy = [...array]; // makes a copy of the incorrect answers
    const randNum = Math.floor(Math.random() * array.length); // gives me a random number between 0 and the length of the incorrect ans
    // splice(index, howmanyelementsiwanttodelete, whatireplacethedeletedpartswith)
    arrCopy.splice(randNum, 0, correct); // insert the correct answer in a random position
    return arrCopy; // return the completed list of answers
  };

  useEffect(() => {
    setOptions(randomize(question.incorrect_answers, question.correct_answer)); // grab all the rearranged answers
    // send the correct answer up to the parent, questions.js
    correctAnswer(decodeHtml(question.correct_answer));
    // eslint-disable-next-line
  }, [question]); // every time the question changes

  const handleClick = (e) => {
    // if the answer is correct
    if (e.target.value === decodeHtml(question.correct_answer)) {
      e.target.style.backgroundColor = "green";
      setConfetti(true);
    // if the answer is incorrect
    } else {
      e.target.style.backgroundColor = "red";
      setConfetti(false);
    }
    // disables all the buttons if something was selected
    setSelected(true);
    // sends the user answer up to the parent, questions.js
    userAnswer(e.target.value);
  };

  return (
    <>
      <div className="question-section">
        <div className="question-header">
          <p>
            <strong>
              Category:{" "}
              <span style={{ color: "blue" }}>{question.category}</span>
            </strong>
          </p>
          <p>
            <strong>
              Question <span style={{ color: "red" }}>{current}</span>/{length}
            </strong>
          </p>
        </div>
        <div className="question-text">
          <strong>{decodeHtml(question.question)}</strong>
        </div>
        <div className="answer-section">
          {options.map((answer, index) => {
            return (
              <button
                key={index}
                className={selected ? "disabled options" : "options"}
                value={decodeHtml(answer)}
                onClick={handleClick}
              >
                {decodeHtml(answer)}
              </button>
            );
          })}
        </div>
        <Confetti
          style={{
            display: confetti ? "inline-block" : "none",
          }}
        />
      </div>
    </>
  );
};

export default QuestionCard;

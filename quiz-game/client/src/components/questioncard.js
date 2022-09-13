import { useEffect, useState } from "react";

const QuestionCard = ({ question, userAnswer, correctAnswer }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(false);

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const randomize = (array, correct) => {
    const arrCopy = [...array];
    const randNum = Math.floor(Math.random() * array.length);
    arrCopy.splice(randNum, 0, correct);
    return arrCopy;
  };

  useEffect(() => {
    setOptions(randomize(question.incorrect_answers, question.correct_answer));
  }, [question]);

  const handleClick = (e) => {
    if (e.target.value === decodeHtml(question.correct_answer)) {
      e.target.style.backgroundColor = "green";
    } else {
      e.target.style.backgroundColor = "red";
    }
    setSelected(true);
    userAnswer(e.target.value);
    correctAnswer(decodeHtml(question.correct_answer));
  };

  return (
    <div className="question-section">
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
    </div>
  );
};

export default QuestionCard;

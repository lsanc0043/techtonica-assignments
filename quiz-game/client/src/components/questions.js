import { useEffect, useState } from "react";

const Questions = ({ formValues }) => {
  const [questions, setQuestions] = useState([]);
  //   const [submitted, setSubmitted] = useState(false);
  const [currQ, setCurrQ] = useState(0);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [atEnd, setAtEnd] = useState(false);

  const randomize = (array, correct) => {
    const arrCopy = [...array];
    const randNum = Math.floor(Math.random() * array.length);
    arrCopy.splice(
      randNum,
      0,
      correct.split("&quot;").join('"').split("&#039;").join("'")
    );
    setOptions(arrCopy);
  };

  const loadData = () => {
    const params = new URLSearchParams({
      amount: formValues.numQ,
      category: formValues.category,
      difficulty: formValues.difficulty,
      type: formValues.type,
    });

    fetch(`http://localhost:5000/api/questions?${params}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setQuestions(data.results);
        console.log(data.results[currQ].incorrect_answers);
        randomize(
          data.results[currQ].incorrect_answers,
          data.results[currQ].correct_answer
        );
      });
  };

  useEffect(() => {
    loadData();
    // setSubmitted(true);
  }, [formValues, currQ, answers]);

  const handleClick = (e) => {
    setCorrect((olderAnswers) => [
      ...olderAnswers,
      questions[currQ].correct_answer,
    ]);
    if (currQ + 1 === Number(formValues.numQ)) {
      console.log("end");
      setAtEnd(true);
    }
    setCurrQ(currQ + 1);
    console.log(currQ, formValues.numQ);
    setAnswers((olderAnswers) => [...olderAnswers, e.target.value]);
  };

  const submitAnswers = () => {
    console.log(answers);
    console.log(correct);
  };

  if (!questions) {
    return <>Loading...</>;
  } else {
    return (
      <>
        {questions.map((question, index) => {
          if (index === currQ) {
            return (
              <div className="question">
                <div className="description">
                  <p>
                    <strong>
                      {question.category} Q#: {index + 1}/{formValues.numQ}
                    </strong>
                  </p>
                </div>
                <p>
                  {question.question
                    .split("&quot;")
                    .join("'")
                    .split("&#039;")
                    .join('"')
                    .split("&amp")
                    .join("&")}
                </p>
                {options.map((option) => {
                  return (
                    <button
                      className="options"
                      key={index}
                      value={option
                        .split("&quot;")
                        .join("'")
                        .split("&#039;")
                        .join('"')
                        .split("&amp")
                        .join("&")}
                      onClick={handleClick}
                    >
                      {option
                        .split("&quot;")
                        .join("'")
                        .split("&#039;")
                        .join('"')
                        .split("&amp")
                        .join("&")}
                    </button>
                  );
                })}
              </div>
            );
          }
        })}
        <button
          style={{ display: atEnd ? "block" : "none" }}
          className="done"
          onClick={submitAnswers}
        >
          Done!
        </button>
      </>
    );
  }
};

export default Questions;

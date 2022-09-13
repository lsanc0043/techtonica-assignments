import { useEffect, useState } from "react";
import QuestionCard from "./questioncard";

const Questions = ({ values }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [correctAns, setCorrectAns] = useState([]);
  const [score, setScore] = useState("");
  const [seeScore, setSeeScore] = useState(false);
  const [records, setRecords] = useState([]);
  const [seeRecord, setSeeRecord] = useState(false);
  const [reset, setReset] = useState(false);

  const makeNewRecord = (q, input, ans) => {
    const newRec = {
      question: q,
      user: input,
      actual: ans,
    };
    console.log(newRec);
    setRecords((oldRecord) => [...oldRecord, newRec]);
  };

  useEffect(() => {
    const loadData = async () => {
      const params = new URLSearchParams({
        amount: values.numQ,
        category: values.category,
        difficulty: values.difficulty,
        type: values.type,
      });

      const response = await fetch(
        `http://localhost:5000/api/questions?${params}`
      );
      const data = await response.json();
      console.log(data.results);
      setQuestions(data.results);
    };
    loadData();
  }, [reset]);

  const userAnswer = (answer) => {
    setAnswers((oldAnswers) => [...oldAnswers, answer]);
  };

  const correctAnswer = (answer) => {
    setCorrectAns((oldAnswers) => [...oldAnswers, answer]);
  };

  const calculateScore = (input, actual) => {
    const difference = input.filter((val) => actual.includes(val));
    setScore(difference.length);
  };

  const handleClick = (e) => {
    if (currentQ === questions.length) {
      console.log("end");
      e.target.innerText = "Done!";
      makeNewRecord(
        questions[currentQ - 1].question,
        answers[answers.length - 1],
        correctAns[correctAns.length - 1]
      );
      calculateScore(answers, correctAns);
      setSeeScore(true);
    } else {
      makeNewRecord(
        questions[currentQ - 1].question,
        answers[answers.length - 1],
        correctAns[correctAns.length - 1]
      );
      setCurrentQ(currentQ + 1);
    }
  };

  const handleReset = () => {
    setCurrentQ(1);
    setAnswers([]);
    setCorrectAns([]);
    setScore("");
    setSeeScore(false);
    setRecords([]);
    setSeeRecord(false);
    setReset((reset) => !reset);
  };

  return (
    <div>
      <div className="question-numbers"></div>
      {!seeScore ? (
        <div className="container">
          <div className="question-count">
            <strong>
              <span>Question {currentQ}</span>/{questions.length}
            </strong>
          </div>
          {questions.map((question, index) => {
            if (index + 1 === currentQ) {
              return (
                <QuestionCard
                  key={index}
                  question={question}
                  userAnswer={userAnswer}
                  correctAnswer={correctAnswer}
                />
              );
            }
          })}
          <button style={{ backgroundColor: "gray" }} onClick={handleClick}>
            Next!
          </button>
        </div>
      ) : (
        <>
          <p>
            <strong>Final Score: {score}</strong>
          </p>
          <button onClick={() => setSeeRecord(true)}>Check the Answers</button>
          <button onClick={handleReset}>Restart</button>

          {seeRecord ? (
            <table>
              <tr>
                <th>Question Number</th>
                <th>Your Answer</th>
                <th>Right Answer</th>
              </tr>
              <tbody>
                {records.map((record, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{record.user}</td>
                      <td>{record.actual}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default Questions;

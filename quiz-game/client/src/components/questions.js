import { useEffect, useState } from "react";
import QuestionCard from "./questioncard";

const Questions = ({ wasReset, values }) => {
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
      setQuestions(data.results);
    };
    loadData();
    // eslint-disable-next-line
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
    // wasReset(false);
  };

  return (
    <>
      {!seeScore ? (
        <div className="container">
          {
            // eslint-disable-next-line
            questions.map((question, index) => {
              if (index + 1 === currentQ) {
                return (
                  <QuestionCard
                    key={index}
                    question={question}
                    userAnswer={userAnswer}
                    correctAnswer={correctAnswer}
                    current={currentQ}
                    length={questions.length}
                  />
                );
              }
            })
          }
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
              <thead>
                <tr>
                  <th>Question Number</th>
                  <th>Your Answer</th>
                  <th>Right Answer</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td
                        style={{
                          color:
                            record.user === record.actual ? "green" : "red",
                        }}
                      >
                        {record.user}
                      </td>
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
    </>
  );
};

export default Questions;

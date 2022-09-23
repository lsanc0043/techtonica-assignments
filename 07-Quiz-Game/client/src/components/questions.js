import { useEffect, useState } from "react";
import QuestionCard from "./questioncard";

const Questions = ({ values, mode }) => {
  const [questions, setQuestions] = useState([]); // stores all the questions - array
  const [currentQ, setCurrentQ] = useState(1); // stores the current question number - number
  const [answers, setAnswers] = useState([]); // stores all the user input answers - array
  const [correctAns, setCorrectAns] = useState([]); // stores all the correct answers - array
  const [score, setScore] = useState(0); // keeps track of the score - number
  const [seeScore, setSeeScore] = useState(false); // determines if you want to see the score (at end of game) - boolean
  const [records, setRecords] = useState([]); // stores all the records (objects w question num, user answer, real answer) - array
  const [seeRecord, setSeeRecord] = useState(false); // determines if you want to see the record (when button clicked) - boolean
  const [reset, setReset] = useState(false); // determines if the game is reset or not - boolean
  const [answeredQs, setAnsweredQs] = useState([]); // stores the indexes of the question that's been answered - array
  const [remainingQs, setRemainingQs] = useState([]); // stores the remaining questions yet to be answered - array

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  // create a new record to store in the records state array
  const makeNewRecord = (num, q, input, ans) => {
    // takes three parameters
    const newRec = {
      // makes a new record as an object
      number: num,
      question: q, // the question number
      user: input, // the user input
      actual: ans, // the correct answer
    };
    setRecords((oldRecord) => [...oldRecord, newRec]); // adds that record to the end of the records state array
  };

  useEffect(() => {
    // runs the code inside depending on the variables in the array
    const loadData = async () => {
      // function that fetches the questions
      const params = new URLSearchParams({
        // object with the query parameters
        amount: mode ? 50 : values.numQ, // the number of questions, 50 if different game mode selected, just user input otherwise
        category: values.category, // the selected category
        difficulty: values.difficulty, // the selected difficulty
        type: values.type, // the selected type
      });

      // make fetch request, store the response
      const response = await fetch(
        `http://localhost:5000/api/questions?${params}`
      );
      const data = await response.json(); // convert response to a json format
      console.log(data.results);
      setQuestions(data.results); // store all the data results into the questions state array
      setRemainingQs(data.results.map((val, index) => index + 1));
    };
    loadData(); // call the function
    // eslint-disable-next-line
  }, [reset]); // tracks any changes to reset, every time game is reset, grab a new set of questions

  // callback function created to retrieve the user input from QuestionCard
  const userAnswer = (answer) => {
    if (answer) {
      makeNewRecord(
        currentQ,
        decodeHtml(questions[currentQ - 1].question),
        answer,
        correctAns[correctAns.length - 1]
      );
      // if the answer is valid or received
      if (answers[currentQ] !== -1) {
        answers[currentQ] = answer;
      } else {
        setAnswers((oldAnswers) => [...oldAnswers, answer]); // add that answer to the end of the answers state array
      }
      setAnsweredQs((oldAnswers) => [...oldAnswers, currentQ]); // add the index of the question that was answered
      remainingQs.splice(remainingQs.indexOf(currentQ), 1); // remove the answered question from the remaining questions
    }
  };

  // callback function creates to retrieve the correct answer from QuestionCard
  const correctAnswer = (answer) => {
    setCorrectAns((oldAnswers) => [...oldAnswers, answer]); // add that correct answer to the end of the correct answers state array
  };

  // calculate the score based off of the array of user inputs and array of correct answers
  const calculateScore = (input, actual) => {
    const difference = input.filter((val) => actual.includes(val)); // filters only the values that match in both
    setScore(difference.length); // set the score state to the length of the filtered array
    return difference.length; // return the length of the filtered array
  };

  // handleclicks made to the Next button
  const handleClick = () => {
    console.log(records);
    // if you've answered all the questions
    if (answeredQs.length === questions.length) {
      records.sort(function (a, b) {
        return -(b.question - a.question);
      });
      // if the new mode isn't selected, calculate score only at the end of the game
      if (!mode) {
        calculateScore(answers, correctAns);
      }
      // see the score at the end of the game, hide the actual game
      setSeeScore(true);
    } else {
      // if your calculated score is equal to the number of questions you want to get right
      if (calculateScore(answers, correctAns) === Number(values.numQ)) {
        setSeeScore(true); // see the score and end the game
      } else {
        // if you're not done with the quiz and you haven't answered the next question yet
        if (
          !answeredQs.includes(currentQ + 1) &&
          currentQ < questions.length - 1
        ) {
          setCurrentQ(currentQ + 1); // move to the next question
        } else {
          // find the next value in the remaining questions that is bigger than your current question number
          const found = remainingQs.findIndex((val) => {
            return val > currentQ;
          });
          // console.log(found);
          // console.log(remainingQs[found === -1 ? 0 : found]);
          setCurrentQ(remainingQs[found === -1 ? 0 : found]); // set it to the next number if found, otherwise go to the first index
        }
      }
    }
  };

  // sets the current question to whichever box was selected
  const handleSelection = (e) => {
    setCurrentQ(Number(e.target.value));
  };

  // resets the game
  const handleReset = () => {
    setCurrentQ(1);
    setAnswers([]);
    setCorrectAns([]);
    setAnsweredQs([]);
    setRemainingQs([]);
    setScore(0);
    setSeeScore(false);
    setRecords([]);
    setSeeRecord(false);
    setReset((reset) => !reset);
  };

  return (
    <>
      {!seeScore ? ( // if you aren't seeing the score or aren't at the end of the game
        <>
          <div className="container">
            {
              // eslint-disable-next-line
              questions.map((question, index) => {
                if (index + 1 === currentQ) {
                  // if your index+1 (since your index starts at 0) is the same as the current question
                  return (
                    <QuestionCard
                      key={index}
                      question={question}
                      userAnswer={userAnswer} // callback function to retrieve user answer
                      correctAnswer={correctAnswer} // callback function to retrieve correct answer
                      current={currentQ}
                      length={mode ? "?" : questions.length} // if different mode is selected, don't specify number of questions
                    />
                  );
                }
              })
            }
            <button style={{ backgroundColor: "gray" }} onClick={handleClick}>
              Next!
            </button>
          </div>
          {!mode ? ( // if not the different game mode
            questions.map((question, index) => {
              // show all the questions as selectable boxes
              return (
                <button
                  key={question.question}
                  onClick={handleSelection}
                  value={index + 1}
                  className={
                    answeredQs.includes(index + 1)
                      ? index + 1 === answeredQs[answeredQs.length - 1]
                        ? records[records.length - 1].user ===
                          records[records.length - 1].actual
                          ? "disabled correct nums"
                          : "disabled incorrect nums"
                        : "disabled nums"
                      : index + 1 === currentQ
                      ? "selected nums"
                      : "nums"
                  }
                >
                  {index + 1}
                </button>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {mode ? ( // if different mode is selected
            <p>
              <strong>
                It took you {currentQ} tries to get{" "}
                {score === Number(values.numQ) ? values.numQ : score} questions
                right.{" "}
                {score === Number(values.numQ)
                  ? "You succeeded! Good job!"
                  : `You failed to get ${values.numQ} questions right, restart to try again.`}
              </strong>
            </p>
          ) : (
            <p>
              <strong>Final Score: {score}</strong>
            </p>
          )}
          <button onClick={() => setSeeRecord(true)}>Check the Answers</button>
          <button onClick={handleReset}>Restart</button>

          {seeRecord ? ( // print the record of answers
            <table>
              <thead>
                <tr>
                  <th>Question Number</th>
                  <th>Question</th>
                  <th>Your Answer</th>
                  <th>Right Answer</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => {
                  return (
                    <tr key={index}>
                      <td>{record.number}</td>
                      <td>{record.question}</td>
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

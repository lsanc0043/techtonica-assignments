import { useEffect, useState } from "react";

const Questions = ({ formValues }) => {
  const [questions, setQuestions] = useState([]);
  const [currQ, setCurrQ] = useState(0);

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
      });
  };

  useEffect(() => {
    loadData();
  }, [formValues]);

  if (!questions) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {questions.map((question, index) => {
          if (index === currQ) {
            return (
              <p key={index}>
                {question.question
                  .split("&quot;")
                  .join("'")
                  .split("&#039;")
                  .join('"')}
              </p>
            );
          }
        })}
        {/* {questions[0].question} */}
      </div>
    );
  }
};

export default Questions;

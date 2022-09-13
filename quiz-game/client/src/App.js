import "./App.css";
import { useState } from "react";
import QuizForm from "./components/quizform";
import Questions from "./components/questions";

function App() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const dataFromChild = (childData, submission) => {
    setValues(childData);
    setSubmitted(submission);
  };

  return (
    <div className="App">
      {!submitted ? <QuizForm formData={dataFromChild} /> : <></>}
      <Questions formValues={values} />
    </div>
  );
}

export default App;

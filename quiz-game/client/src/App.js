import "./App.css";
import { useState } from "react";
import QuizForm from "./components/quizform";
import Questions from "./components/questions";

function App() {
  const [values, setValues] = useState({});

  const dataFromChild = (childData) => {
    setValues(childData);
  };

  return (
    <div className="App">
      <h1>Start your Quiz!</h1>
      <QuizForm formData={dataFromChild} />
      <Questions formValues={values} />
      {/* {Object.entries(values).map((name, index) => (
        <p key={index}>{name}</p>
      ))} */}
    </div>
  );
}

export default App;

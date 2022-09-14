import "./App.css";
import { useState } from "react";
import Questions from "./components/questions";
import Form from "./components/inputform";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState([]);

  const wasSubmitted = (childData) => {
    setSubmitted(childData);
  };

  const formValues = (childData) => {
    setValues(childData);
  };

  if (!submitted) {
    return (
      <div>
        <Form wasSubmitted={wasSubmitted} formValues={formValues} />
      </div>
    );
  } else {
    return (
      <>
        <button
          onClick={() => setSubmitted(false)}
          style={{ backgroundColor: "gray" }}
        >
          Go Back to Selection
        </button>
        <Questions values={values} />
      </>
    );
  }
}

export default App;

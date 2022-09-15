import "./App.css";
import { useState } from "react";
import Questions from "./components/questions";
import Form from "./components/inputform";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState([]);
  const [newMode, setNewMode] = useState(false);

  const wasSubmitted = (childData) => {
    setSubmitted(childData);
  };

  const formValues = (childData) => {
    setValues(childData);
  };

  const diffMode = (childData) => {
    setNewMode(childData);
  };

  if (!submitted) {
    return (
      <div>
        <Form
          wasSubmitted={wasSubmitted}
          formValues={formValues}
          mode={diffMode}
        />
      </div>
    );
  } else {
    return (
      <>
        <button
          onClick={() => {
            setSubmitted(false);
            setNewMode(false);
          }}
          style={{ backgroundColor: "gray" }}
        >
          Go Back to Selection
        </button>
        <Questions values={values} mode={newMode} />
      </>
    );
  }
}

export default App;

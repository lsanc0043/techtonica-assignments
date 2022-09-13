import "./App.css";
import { useState } from "react";
import Questions from "./components/questions";
import Form from "./components/inputform";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState([]);

  const wasSubmitted = (childData) => {
    console.log(submitted);
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
      <div>
        <Questions values={values} />
      </div>
    );
  }
}
// const [values, setValues] = useState({});
// const [submitted, setSubmitted] = useState(false);

// const dataFromChild = (childData, submission) => {
//   setValues(childData);
//   setSubmitted(submission);
// };

// const handleClick = () => {
//   setSubmitted(false);
// };

// if (!submitted) {
//   return (
//     <div className="App">
//       <QuizForm formData={dataFromChild} />
//     </div>
//   );
// } else {
//   return (
//     <div className="App">
//       <button onClick={handleClick}>Go back to selection</button>
//       <Questions formValues={values} />
//     </div>
//   );
// }

export default App;

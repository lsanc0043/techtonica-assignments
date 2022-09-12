import { useState } from "react";
import Category from "./categories";
const QuizForm = ({ formData }) => {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    category: "",
    numQ: "",
    difficulty: "",
    type: "",
  });
  const dataFromChild = (childData) => {
    setValues((originalValues) => ({
      ...originalValues,
      ["category"]: childData,
    }));
  };

  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((originalValues) => ({ ...originalValues, [name]: value }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData(values);
    setSubmitted(true);
  };

  if (submitted === true) {
    return (
      <div>
        <button onClick={() => setSubmitted(false)}>
          Go back to selection
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Category childToParent={dataFromChild} /> <br />
          <label htmlFor="numQ">How many questions? </label>
          <input
            id="numQ"
            type="number"
            min="1"
            max="50"
            onChange={set("numQ")}
          />
          <br /> <br />
          <label htmlFor="difficulty">Difficulty: </label>
          <select
            id="difficulty"
            value={values.difficulty}
            onChange={set("difficulty")}
          >
            <option value="">--Choose difficulty--</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <br /> <br />
          <input
            type="radio"
            id="MC"
            name="type_of_q"
            value="multiple"
            onChange={set("type")}
          />
          <label htmlFor="MC">Multiple Choice</label> <br />
          <input
            type="radio"
            id="TF"
            name="type_of_q"
            value="boolean"
            onChange={set("type")}
          />
          <label htmlFor="TF">True/False</label> <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
};

export default QuizForm;

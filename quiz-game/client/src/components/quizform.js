import { useState } from "react";
import Category from "./categories";
const QuizForm = () => {
  const [selectedCat, setSelectedCat] = useState("");
  const [values, setValues] = useState({
    category: selectedCat,
    numQ: "",
    difficulty: "",
    type: "",
  });
  const dataFromChild = (childData) => {
    setValues((values.category = { childData }));
    setSelectedCat(childData);
  };

  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((originalValues) => ({ ...originalValues, [name]: value }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

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
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <br /> <br />
        <input type="radio" id="MC" name="type_of_q" value="MC" />
        <label htmlFor="MC">Multiple Choice</label> <br />
        <input type="radio" id="TF" name="type_of_q" value="TF" />
        <label htmlFor="TF">True/False</label>
      </form>
      <p>{selectedCat}</p>
      <p>{values.numQ}</p>
      <p>{values.difficulty}</p>
    </div>
  );
};

export default QuizForm;

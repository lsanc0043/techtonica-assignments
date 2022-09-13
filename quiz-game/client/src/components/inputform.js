import { useEffect, useState } from "react";

const Form = ({ wasSubmitted, formValues }) => {
  const [categories, setCategories] = useState([]); // store the categories

  const [values, setValues] = useState({
    // store all the form inputs
    category: "",
    numQ: "",
    difficulty: "",
    type: "",
  });

  useEffect(() => {
    const loadData = async () => {
      // fetch the categories
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();

      setCategories(data.trivia_categories);
    };
    // load in the categories
    loadData();
  }, []);

  const set = (name) => {
    // set each property in the values object
    return ({ target: { value } }) => {
      setValues((originalValues) => ({ ...originalValues, [name]: value }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValues(values);
    wasSubmitted(true);
  };

  return (
    <div className="container">
      <h1>Customize your Quiz!</h1>
      <p>
        Specify number, but you can leave all other field empty to randomize
        category, difficulty, and type of question.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Select a Category:</strong>
          <select value={values.category} onChange={set("category")}>
            <option value="">--Pick a Category--</option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </label>
        <br />
        <label htmlFor="numQ">
          <strong>How many questions? </strong>
        </label>
        <input
          id="numQ"
          type="number"
          min="1"
          max="50"
          onChange={set("numQ")}
        />
        <br /> <br />
        <label htmlFor="difficulty">
          <strong>Difficulty: </strong>
        </label>
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
        <label htmlFor="MC">
          <strong>Multiple Choice</strong>
        </label>{" "}
        <br />
        <input
          type="radio"
          id="TF"
          name="type_of_q"
          value="boolean"
          onChange={set("type")}
        />
        <label htmlFor="TF">
          <strong>True/False</strong>
        </label>{" "}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
  //   }
};

export default Form;

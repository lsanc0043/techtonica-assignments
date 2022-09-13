import { useEffect, useState } from "react";
const QuizForm = ({ formData }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState(null);

  const [values, setValues] = useState({
    category: "",
    numQ: "",
    difficulty: "",
    type: "",
  });

  const loadData = () => {
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((originalValues) => ({ ...originalValues, [name]: value }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    formData(values, submitted);
  };

  if (submitted === true) {
    return (
      <>
        <button onClick={() => setSubmitted(false)}>
          Go back to selection
        </button>{" "}
        <br />
      </>
    );
  } else if (!categories) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="card">
        <h1>Customize your Quiz!</h1>
        <form onSubmit={handleSubmit}>
          <select value={values.category} onChange={set("category")}>
            <option value="">--Pick a Category--</option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>{" "}
          <br />
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

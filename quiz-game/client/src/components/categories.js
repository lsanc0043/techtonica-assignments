import { useEffect, useState } from "react";

const Category = ({ childToParent }) => {
  const [categories, setCategories] = useState(null);
  const [selectedCat, setSelectedCat] = useState("");

  const loadData = () => {
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.trivia_categories);
        setCategories(data.trivia_categories);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    childToParent(e.target.value);
    setSelectedCat(e.target.value);
  };

  if (!categories) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <select value={selectedCat} onChange={handleChange}>
          <option value="">--Pick a Category--</option>
          {categories.map((category, index) => {
            return <option key={index}>{category.name}</option>;
          })}
        </select>
      </div>
    );
  }
};

export default Category;

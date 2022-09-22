import { useState } from "react";

const AddUser = ({ users }) => {
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const set = (input) => {
    return ({ target: { value } }) => {
      setNewUser((originalValues) => ({
        ...originalValues,
        [input]: value,
      }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newUser);
    const rawResponse = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const content = await rawResponse.json();
    users.push(content);
    setNewUser({ name: "", email: "" });
  };
  return (
    <tr>
      <td></td>
      <td></td>
      <td>
        <input
          type="text"
          id="add-user-name"
          name="name"
          value={newUser.name}
          onChange={set("name")}
        />
      </td>
      <td>
        <input
          type="text"
          id="add-user-email"
          name="email"
          value={newUser.email}
          onChange={set("email")}
        />
      </td>
      <td>
        <input type="submit" value="Add" onClick={handleSubmit} />
      </td>
      <td></td>
    </tr>
  );
};

export default AddUser;

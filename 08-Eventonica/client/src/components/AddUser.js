// Note: will be capitalizing the comments for crucial and necessary lines of code or functions, CTRL+F and type !!  to find
import { useState } from "react"; // !! IMPORT useState TO CREATE AND UPDATE STATES

const AddUser = ({ users }) => { // !! ACCEPTS THE LIST OF USERS AS PROPS
  const [newUser, setNewUser] = useState({ name: "", email: "" }); // !! STORE THE NEW USER, INITIALIZE EMPTY NAME AND EMAIL

  // !! SET FUNCTION, compresses setId, setName, and setEmail into one function
  const set = (input) => {
    return ({ target: { value } }) => {
      // can't use e.target.value because we're taking input as a parameter
      setNewUser((originalValues) => ({
        // keep original values of newUser, only change what the [input] is
        ...originalValues,
        [input]: value,
      }));
    };
  };

  // !! POST REQUEST TO CONNECT TO BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault(); // won't refresh page
    console.log(newUser);
    const rawResponse = await fetch("http://localhost:4000/users", {
      // fetch request made to this url
      method: "POST", // POST method
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser), // converts newUser to a JSON
    });
    const content = await rawResponse.json(); // converts response to a JSON
    users.push(content); // add the inputted new user information to the list of users
    setNewUser({ name: "", email: "" }); // reset the newUser fields so we can add more
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

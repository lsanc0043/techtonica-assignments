// Note: will be capitalizing the comments for crucial and necessary lines of code or functions, CTRL+F and type !!  to find
import { useState } from "react"; // !! IMPORT useState TO CREATE AND UPDATE STATES
import AddUser from "./AddUser"; // moved AddUser functionality to another component

const UserTable = ({
  users,
  deleteUser,
  searchInput,
  favEvents,
  dataToUser,
}) => {
  /* props are a !! LIST OF THE USERS, deleteUser CALLBACK FUNCTION TO SEND DESIRED ID TO DELETE TO Users.js, the search input to filter users,
  the list of favEvents from Events.js, and the dataToUser callback function to send username to Users.js*/
  const [username, setUsername] = useState(""); // username input to pass up to Users.js
  const [submitted, setSubmitted] = useState(false); // if submitted, hide the rest of the users, otherwise, show table
  const [error, setError] = useState(false); // if the username is not in the list of users, print error message
  // eslint-disable-next-line
  const [editArr, setEditArr] = useState([]); // stores a list of the ID for users you want to edit
  const [newUser, setNewUser] = useState({ name: "", email: "" }); // makes a new user so that we can edit a user

  // compresses functions like setId, setName, and setEmail into one function
  const set = (input) => {
    return ({ target: { value } }) => {
      setNewUser((originalValues) => ({
        ...originalValues,
        [input]: value,
      }));
    };
  };

  // filters the list of users based on the search input, will print the original list if search input is empty
  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // handles what happens when the user types a username
  const handleSubmit = (e) => {
    e.preventDefault(); // won't refresh the page
    const checkUser = users.filter((user) => user.name === username); // checks if username is within the list of created users
    if (checkUser.length > 0) {
      // if the username is there
      setSubmitted(true); // set submitted to true
      dataToUser(username); // callback function to send the username to Users.js
      setError(false); // set the error to false, will remove the error if user enters a wrong username, then a correct one
    } else {
      // if the username is not there
      setError(true); // print error message
    }
  };

  // !! WILL OBTAIN THE ID YOU WANT TO DELETE WHEN DELETE BUTTON IS CLICKED
  const handleClick = (e) => {
    console.log(e.currentTarget.value); // currentTarget is for buttons with other tags and content inside
    deleteUser(e.currentTarget.value); // !! CALLBACK FUNCTION TO SEND THE ID YOU WANT TO DELETE TO Users.js
  };

  // edit functionality - cancel edit mode
  const handleCancel = (e) => {
    editArr.splice(editArr.indexOf(Number(e.currentTarget.value))); // removes the user from the array of users you want to edit
  };

  // edit functionality - dynamic buttons
  const handleEdit = (e) => {
    if (editArr.indexOf(Number(e.currentTarget.value)) !== -1) {
      // if the user you want to edit is already in the array
      handleCancel(e); // remove it
    } else {
      editArr.push(Number(e.currentTarget.value)); // else, add the user you want to edit to the array
    }
  };

  // edit functionality - actually changing the data
  const handlePut = async (e) => {
    e.preventDefault(); // won't refresh the page
    console.log(e.target.id);
    let response = await fetch(`http://localhost:4000/users/${e.target.id}`, {
      // fetch from the url with the parameter of e.target.id
      method: "PUT", // put request
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser), // converts newUser to a JSON
    });
    await response.json(); // converts response to a JSON
    editArr.splice(editArr.indexOf(Number(e.target.id))); // remove the user from the array of edited users, can also do handleCancel(e)
    setNewUser({ name: "", email: "" }); // resets the fields
  };

  if (submitted) {
    // if submitted, hide the user table
    return (
      <>
        {/* button to return to seeing the whole table and "logging in" as a different user */}
        <button
          onClick={() => {
            setSubmitted(false);
            dataToUser(""); // reset the username field
          }}
        >
          Login to a different account
        </button>
        <h1>Welcome {username}</h1>
        <h3>Here are your Favorited Events</h3>
        {/* list of favEvents from Events.js mapped as an ordered list */}
        <ol>
          {favEvents.map((event, index) => {
            return <li key={index}>{event}</li>;
          })}
        </ol>
      </>
    );
  } else {
    // if you have not submitted a username yet
    return (
      <>
        {/* form to accept a username */}
        <form onSubmit={handleSubmit}>
          <label>Who are you?</label> <br />
          <input
            placeholder="Login with Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input type="submit" />
        </form>
        <p style={{ display: error ? "block" : "none" }}>
          Account does not exist.
        </p>
        {/* user table, list of users as table rows/entries */}
        <table className="table">
          {/* table headings */}
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Name</th>
              <th>E-mail</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* maps the filtered array instead of users because i want to be able to print out filtered results */}
            {filtered.map((user, index) => {
              return (
                <tr key={index}>
                  <td>
                    {/* edit user information functionality */}
                    <button value={user.id} onClick={handleEdit}>
                      <i
                        className={
                          editArr.includes(user.id)
                            ? "fa fa-times"
                            : "fa fa-pencil-square-o"
                        }
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                  <td>{user.id}</td>
                  {/* switches to edit mode if edit button clicked, otherwise, user.name*/}
                  <td>
                    {editArr.includes(user.id) ? (
                      <input
                        type="text"
                        id="add-user-name"
                        name="name"
                        placeholder={`${user.name}`}
                        value={newUser.name}
                        onChange={set("name")}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  {/* switches to edit mode if edit button clicked, otherwise, user.email*/}
                  <td>
                    {editArr.includes(user.id) ? (
                      <input
                        type="email"
                        id="add-user-email"
                        name="email"
                        placeholder={`${user.email}`}
                        value={newUser.email}
                        onChange={set("email")}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  {/* delete button, switches to submit button when in edit mode */}
                  <td>
                    <button
                      value={user.id}
                      onClick={
                        editArr.includes(user.id) ? () => {} : handleClick
                      }
                    >
                      <input
                        type="submit"
                        style={{
                          display: editArr.includes(user.id) ? "block" : "none",
                        }}
                        value="Edit"
                        id={user.id}
                        onClick={handlePut}
                      />
                      <i
                        className={
                          editArr.includes(user.id) ? "" : "fa fa-trash-o"
                        }
                      ></i>
                    </button>
                  </td>
                </tr>
              );
            })}
            {/* add a user, accepts the list of filtered users as props */}
            <AddUser users={filtered} />
          </tbody>
        </table>
      </>
    );
  }
};

export default UserTable;

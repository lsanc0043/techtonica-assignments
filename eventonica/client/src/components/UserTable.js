import { useState } from "react";
import AddUser from "./AddUser";

const UserTable = ({
  users,
  deleteUser,
  searchInput,
  favEvents,
  dataToUser,
}) => {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [editArr, setEditArr] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const set = (input) => {
    return ({ target: { value } }) => {
      setNewUser((originalValues) => ({
        ...originalValues,
        [input]: value,
      }));
    };
  };

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkUser = users.filter((user) => user.name === username);
    if (checkUser.length > 0) {
      setSubmitted(true);
      dataToUser(username);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleClick = (e) => {
    console.log(e.currentTarget.value);
    deleteUser(e.currentTarget.value);
  };

  const handleCancel = (e) => {
    editArr.splice(editArr.indexOf(Number(e.currentTarget.value)));
  };

  const handleEdit = (e) => {
    if (editArr.indexOf(Number(e.currentTarget.value)) !== -1) {
      handleCancel(e);
    } else {
      editArr.push(Number(e.currentTarget.value));
    }
  };

  const handlePut = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    let response = await fetch(`http://localhost:4000/users/${e.target.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    await response.json();
    editArr.splice(editArr.indexOf(Number(e.target.id)));
  };

  if (submitted) {
    return (
      <>
        <button
          onClick={() => {
            setSubmitted(false);
            dataToUser("");
          }}
        >
          Login to a different account
        </button>
        <h1>Welcome {username}</h1>
        <h3>Here are your Favorited Events</h3>
        <ol>
          {favEvents.map((event, index) => {
            return <li key={index}>{event}</li>;
          })}
        </ol>
      </>
    );
  } else {
    return (
      <>
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
        <table className="table">
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
            {filtered.map((user, index) => {
              return (
                <tr key={index}>
                  <td>
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
                        value="Add"
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
            <AddUser users={users} />
          </tbody>
        </table>
      </>
    );
  }
};

export default UserTable;

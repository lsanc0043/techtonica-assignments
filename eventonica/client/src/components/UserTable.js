import { useState } from "react";
import AddUser from "./AddUser";

const UserTable = ({ users, deleteUser, searchInput }) => {
  const [favorited, setFavorited] = useState([]);
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [accountFaves, setAccountFaves] = useState({});

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(searchInput)
  );

  const handleClick = (e) => {
    console.log(e.currentTarget.value);
    deleteUser(e.currentTarget.value);
  };

  const handleFavorite = (e) => {
    console.log(e.currentTarget.value);
    const value = Number(e.currentTarget.value);
    if (favorited.includes(value)) {
      console.log("already there");
      const deleteFavorite = favorited.filter((val) => val !== value);
      console.log(deleteFavorite);
      setFavorited(deleteFavorite);
    }
    favorited.push(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkUser = users.filter((user) => user.name === username);
    if (checkUser.length > 0) {
      setSubmitted(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (submitted) {
    return (
      <>
        <button onClick={() => setSubmitted(false)}>
          Login to a different account
        </button>
        <h1>Welcome {username}</h1>
      </>
    );
  } else {
    return (
      <>
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
                    <button value={index} onClick={handleFavorite}>
                      <i
                        className={
                          favorited.includes(index)
                            ? `fa fa-heart ${index}`
                            : `fa fa-heart-o ${index}`
                        }
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button value={user.id} onClick={handleClick}>
                      <i className="fa fa-trash-o" style={{ color: "red" }}></i>
                    </button>
                  </td>
                </tr>
              );
            })}
            <AddUser users={users} />
          </tbody>
        </table>
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
      </>
    );
  }
};

export default UserTable;

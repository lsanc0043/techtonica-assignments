import { useState } from "react";
import DeleteUser from "./deleteUser";
const marlin = { name: "Marlin", email: "marlin@gmail.com", id: "1" };
const nemo = { name: "Nemo", email: "nemo@gmail.com", id: "2" };
const dory = { name: "Dory", email: "dory@gmail.com", id: "3" };

const UserManagement = () => {
  const [users, setUsers] = useState([marlin, nemo, dory]);
  const [newUser, setNewUser] = useState({ name: "", email: "", id: "" });

  const set = (input) => {
    return ({ target: { value } }) => {
      setNewUser((originalValues) => ({
        ...originalValues,
        [input]: value,
      }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newUser);
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "", id: "" });
  };

  const deleteUser = (deleteId) => {
    const newUsers = users.filter((i) => i.id !== deleteId);
    setUsers(newUsers);
  };

  return (
    <section className="user-management">
      <h2>User Management</h2>

      <ul id="users-list">
        {/* display all existing Users here */}
        {users.map((user, index) => {
          return (
            <li key={index}>
              Name: {user.name}, E-mail: {user.email}
            </li>
          );
        })}
      </ul>

      <div>
        <h3>Add User</h3>
        <form id="add-user" action="#" onSubmit={handleSubmit}>
          <fieldset>
            <label>Name</label>
            <input
              type="text"
              id="add-user-name"
              value={newUser.name}
              onChange={set("name")}
            />
            <label>E-mail</label>
            <input
              type="text"
              id="add-user-email"
              value={newUser.email}
              onChange={set("email")}
            />
            <label>Id</label>
            <input
              type="text"
              id="add-user-id"
              value={newUser.id}
              onChange={set("id")}
            />
          </fieldset>
          {/* Add more form fields here */}
          <input type="submit" value="Add" />
        </form>
      </div>

      <DeleteUser deleteUser={deleteUser} />
    </section>
  );
};

export default UserManagement;

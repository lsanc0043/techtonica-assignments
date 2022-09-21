import { useState, useEffect } from "react";
// import DeleteUser from "./DeleteUser";
import UserTable from "./UserTable";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getUsers = async () => {
    const response = await fetch("http://localhost:4000/users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  const deleteUser = async (deleteId) => {
    let response = await fetch(`http://localhost:4000/users/${deleteId}`, {
      method: "DELETE",
    });
    await response.json();

    const deleteUsers = users.filter((user) => user.id !== deleteId);
    console.log(deleteUsers);
    setUsers(deleteUsers);
  };

  return (
    <section className="user-management">
      <h2>User Management</h2>
      <h3>All Users</h3>
      <div className="card">
        <div className="card-header">
          Users
          <span>
            <input
              type="text"
              placeholder="Search by name.."
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </span>
        </div>
        <UserTable
          users={users}
          deleteUser={deleteUser}
          searchInput={searchInput}
        />
      </div>
    </section>
  );
};

export default UserManagement;

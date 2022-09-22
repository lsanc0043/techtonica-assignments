import { useState, useEffect } from "react";
// import DeleteUser from "./DeleteUser";
import UserTable from "./UserTable";

const UserManagement = ({ favEvents, dataToApp }) => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState("");

  const getUsers = async (param) => {
    const response = await fetch(`http://localhost:4000/users/${param}`);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers(sort);
  }, [users, sort]);

  const deleteUser = async (deleteId) => {
    let response = await fetch(`http://localhost:4000/users/${deleteId}`, {
      method: "DELETE",
    });
    await response.json();

    const deleteUsers = users.filter((user) => user.id !== deleteId);
    console.log(deleteUsers);
    setUsers(deleteUsers);
  };

  const dataFromTable = (childData) => {
    dataToApp(childData);
  };

  return (
    <section className="user-management">
      <h2>User Management</h2>
      <h3>All Users</h3>
      <div className="card">
        <div className="card-header">
          Users
          <button
            style={{ border: "solid" }}
            onClick={() => setSort("sortedId")}
          >
            Sort By Id
          </button>
          <button
            style={{ border: "solid" }}
            onClick={() => setSort("sortedName")}
          >
            Sort By Name
          </button>
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
          favEvents={favEvents}
          dataToUser={dataFromTable}
        />
      </div>
    </section>
  );
};

export default UserManagement;

// Note: will be capitalizing the comments for crucial and necessary lines of code or functions, CTRL+F and type !!  to find
import { useState, useEffect } from "react"; // !! IMPORT useState AND useEffect TO CREATE STATES AND RUN FUNCTIONS A DESIRED NUMBER OF TIMES
// import DeleteUser from "./DeleteUser";
import UserTable from "./UserTable";

const UserManagement = ({ favEvents, dataToApp }) => {
  // props are the list of favorited events from Events.js and the callback function
  const [users, setUsers] = useState([]); // !! STORE ALL THE USERS FROM THE FETCH REQUEST MADE TO THE BACKEND
  const [searchInput, setSearchInput] = useState(""); // store the search input to filter the users
  const [sort, setSort] = useState(""); // store the column name that should be sorted

  // !! CONNECTION TO BACKEND, GET USERS LIST
  const getUsers = async (param) => {
    // param is unnecessary, this is for my sort by ____ functionality
    const response = await fetch(`http://localhost:4000/users/${param}`); // !! STORES RESPONSE FROM URL with params as optional
    const data = await response.json(); // !! CONVERTS RESPONSE TO A JSON
    setUsers(data); // !! SET THE users STATE TO data
  };

  // !! ALLOWS YOU TO RUN getUsers() EVERY TIME users CHANGES
  useEffect(() => {
    getUsers(sort); // !! CALLING getUsers(), sort is optional
  }, [users, sort]); // ARRAY OF VARIABLES TO MONITOR, CHANGES MADE TO users WILL RELOAD THE DATA, sort is optional

  // !! DELETE THE USER DEPENDING ON THE INPUTTED ID, SEND TO BACKEND, WILL AFFECT SQL DATABASE, get data from UserTable.js
  const deleteUser = async (deleteId) => {
    let response = await fetch(`http://localhost:4000/users/${deleteId}`, {
      // !! STORES RESPONSE FROM URL, deleteId AS PARAMETER
      method: "DELETE", // !! SET METHOD OF FETCH TO DELETE
    });
    await response.json(); // !! CONVERT RESPONSE TO JSON

    const deleteUsers = users.filter((user) => user.id !== deleteId); // !! UPDATES THE FRONT END BY REMOVING THE USER WITH THE ID OF deleteId
    console.log(deleteUsers);
    setUsers(deleteUsers); // !! SET users TO THE NEWLY FILTERED LIST WITHOUT THE SPECIFIED deleteId
  };

  // get username data from UserTable.js
  const dataFromTable = (childData) => {
    dataToApp(childData); // send username data to App.js
  };

  return (
    <section className="user-management">
      <h2>User Management</h2>
      <h3>All Users</h3>
      <div className="card">
        <div className="card-header">
          Users
          {/* sorts list of users by id */}
          <button
            style={{ border: "solid" }}
            onClick={() => setSort("sortedId")}
          >
            Sort By Id
          </button>
          {/* sorts list of users by name */}
          <button
            style={{ border: "solid" }}
            onClick={() => setSort("sortedName")}
          >
            Sort By Name
          </button>
          {/* search bar for name */}
          <span>
            <input
              type="text"
              placeholder="Search by name.."
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </span>
        </div>
        {/* generates table of users
            accepts: a list of the users obtained from the fetch request,
            the callback function to send the id you want to delete to Users.js
            the search input to filter the names by what was typed,
            the list of favEvents from Events.js, and
            the callback function to send username data to Users.js */}
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

// Note: will be capitalizing the comments for crucial and necessary lines of code or functions, CTRL+F and type !!  to find
// !! THIS ONE IS OPTIONAL IF YOU HAVE A DELETE ICON OR BUTTON, EVERYTHING IS IMPORTANT IF YOU WANT TO USE THIS COMPONENT
import { useState } from "react"; // import useState to create and update states

const DeleteUser = ({ deleteUser }) => { // accepts the callback function to send data up to Users.js as props
  const [userId, setUserId] = useState(""); // stores the user inputted id 
  
  // what to do on form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // won't refresh the page
    deleteUser(userId); // send the user inputted id up to Users.js to be deleted
    setUserId(""); // reset input so you can delete multiple ids
  };

  return (
    <div>
      <h3>Delete User</h3>
      {/* delete user form */}
      <form id="delete-user" action="#" onSubmit={handleSubmit}>
        <fieldset>
          <label>User ID: </label>
          <input
            type="text"
            id="delete-user-id"
            name="id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </fieldset>
        <input type="submit" />
      </form>
    </div>
  );
};

export default DeleteUser;

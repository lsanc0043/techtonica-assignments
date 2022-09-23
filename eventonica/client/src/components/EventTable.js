// Note: will be capitalizing the comments for crucial and necessary lines of code or functions, CTRL+F and type !!  to find
import { useState, useEffect } from "react"; // !! IMPORT useState TO CREATE AND UPDATE STATES, useEffect is for my user-specific favEvents
import AddEvent from "./AddEvent"; // moved AddEvent functionality to another component

const EventTable = ({
  events,
  deleteEvent,
  searchInput,
  field,
  dataToEvent,
  username,
}) => {
  /* props are a !! LIST OF THE EVENTS, deleteEvent CALLBACK FUNCTION TO SEND DESIRED ID TO DELETE TO Events.js, the search input to filter events,
    the field of either name, date, or category i want to filter by, the dataToEvent callback function to send favEvents to Events.js, and the username from Users.js*/
  const [favorited, setFavorited] = useState([]); // store a list of the event IDs a user favorites
  // eslint-disable-next-line
  const [userFav, setUserFav] = useState({}); // object with every user and their favEvents, i.e. {Linda: ["event", "event"], Sanchez: ["event"]}
  // eslint-disable-next-line
  const [posUsers, setPosUsers] = useState([]); // a list of the usernames the user has inputted

  // check if the user has an existing entry of favEvents
  const checkExists = () => {
    if (username !== "") {
      // if the user-inputted username to login isn't empty
      if (!posUsers.includes(username)) {
        // if the user has never inputted that username before
        posUsers.push(username); // add the username to the list of possible users
        setFavorited([]); // the list of favorite events for that username is empty
        dataToEvent(null); // send null/nothing to Events.js
        console.log(favorited, "not there");
      } else {
        // if the user-inputted username to login has been inputted before
        if (userFav[username] === undefined) {
          // if the user doesn't have an existing list of favEvents
          setFavorited([]); // set their list of favorite events to an empty array
          dataToEvent(null); // send null/nothing to Events.js
        } else {
          // if the user DOES have an existing list of favorites
          setFavorited(userFav[username]); // set the values of userFav[username] to the favEvents, so userFav[Linda] = ["eventId1", "eventId2"]
          console.log(favorited, userFav, "is there");
          dataToEvent(userFav); // sends this object of {user1: [favEvents], user2: [favEvents], etc} to Events.js
        }
      }
    }
  };

  // allows me to run checkExists() every time username changes
  useEffect(() => {
    checkExists();
    // eslint-disable-next-line
  }, [username]); // array of variables to monitor, changes made to username will reload the data

  // filters the list of events based on the field and the search input, will print the original list if search input is empty
  const filtered = events.filter((event) => {
    switch (field) {
      case "name": // filters by name
        return event.name.toLowerCase().includes(searchInput.toLowerCase());
      case "date": // filters by date
        return event.date.includes(searchInput.toLowerCase());
      case "category": // filters by category
        return event.category.toLowerCase().includes(searchInput.toLowerCase());
      case "":
        return event;
      default:
        // eslint-disable-next-line
        return;
    }
  });

  // !! WILL OBTAIN THE ID YOU WANT TO DELETE WHEN THE DELETE BUTTON IS CLICKED
  const handleClick = (e) => {
    console.log(e.currentTarget.value); // currentTarget is for buttons with other tags and content inside
    deleteEvent(e.currentTarget.value); // !! CALLBACK FUNCTION TO SEND THE ID YOU WANT TO DELETE TO Events.js
  };

  // handles when you favorite or unfavorite an event
  const handleFavorite = (e) => {
    userFav[username] = []; // i.e sets userFav[Linda] = [] for now
    const value = Number(e.currentTarget.value); // grabs the id of the event you favorited
    if (favorited.includes(value)) {
      // if you've already favorited that event
      const deleteFavorite = favorited.filter((val) => val !== value); // remove it
      setFavorited(deleteFavorite); // set favorited events to the filtered array
      userFav[username] = deleteFavorite; // i.e, sets userFav[Linda] to the filtered array
      // setFav(deleteFavorite);
      console.log(userFav);
      dataToEvent(userFav); // sends this object of {user1: [favEvents], user2: [favEvents], etc} to Events.js
    } else {
      // if the event isn't already favorited
      favorited.push(value); // add it to the list of favorited events
      userFav[username] = favorited; // i.e. sets userFav[Linda] to the list of favorited events
      console.log(userFav);
      dataToEvent(userFav); // sends this object of {user1: [favEvents], user2: [favEvents], etc} to Events.js
    }
  };

  return (
    // event table, list of events as table rows/entries
    <table className="table">
      {/* table headings */}
      <thead>
        <tr>
          <th></th>
          <th>Id</th>
          <th>Date</th>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* maps the filtered array instead of events because i want to be able to print out filtered results */}
        {filtered.map((event, index) => {
          return (
            <tr key={index}>
              <td>
                {/* favorite an event functionality */}
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
              <td>{event.id}</td>
              <td>{event.date.slice(0, 10)}</td>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.category}</td>
              {/* delete button */}
              <td>
                <button value={event.id} onClick={handleClick}>
                  <i className="fa fa-trash-o"></i>
                </button>
              </td>
            </tr>
          );
        })}
        {/* add an event, accepts a list of filtered events as props */}
        <AddEvent events={filtered} />
      </tbody>
    </table>
  );
};

export default EventTable;

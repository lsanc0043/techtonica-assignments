// Note: will be capitalizing the comments for crucial and necessary lines of code or functions, CTRL+F and type !!  to find
import { useState, useEffect } from "react"; // !! IMPORT useState AND useEffect TO CREATE STATES AND RUN A FUNCTION A DESIRED NUMBER OF TIMES
import EventTable from "./EventTable";

const EventManagement = ({ username, dataToApp }) => {
  // props are the user-inputted username and the callback function
  const [events, setEvents] = useState([]); // !! STORE ALL THE EVENTS FROM THE FETCH REQUEST MADE TO THE BACKEND
  const [searchInput, setSearchInput] = useState(""); // store the search input to filter the events
  const [field, setField] = useState(""); // determines which field to filter, either by name, date or category
  const [sort, setSort] = useState(""); // stores the column name that should be sorted

  // !! CONNECTION TO BACKEND, GET EVENTS LIST
  const getEvents = async (param) => {
    // param is unnecessary, this is for my sort by ____ functionality
    const response = await fetch(`http://localhost:4000/events/${param}`); // !! STORES RESPONSE FROM URL with params as optional
    const data = await response.json(); // !! CONVERTS RESPONSE TO A JSON
    setEvents(data); // !! SET THE events STATE TO data
  };

  // !! ALLOWS YOU TO RUN getEvents() EVERY TIME users CHANGES
  useEffect(() => {
    getEvents(sort); // !! CALLING getEvents(), sort is optional
  }, [events, sort]); // ARRAY OF VARIABLES TO MONITOR, CHANGES MADE TO events WILL RELOAD THE DATA, sort is optional

  // !! DELETE THE USER DEPENDING ON THE INPUTTED ID, SEND TO BACKEND, WILL AFFECT SQL DATABASE, get data from EventTable.js
  const deleteEvent = async (deleteId) => {
    let response = await fetch(`http://localhost:4000/events/${deleteId}`, {
      // !! STORES RESPONSE FROM URL, deleteId AS PARAMETER
      method: "DELETE", // !! SET METHOD OF FETCH TO DELETE
    });
    await response.json(); // !! CONVERT RESPONSE TO JSON

    const deleteEvents = events.filter(
      (event) => event.id !== Number(deleteId)
    ); // !! UPDATES THE FRONT END BY REMOVING THE EVENT WITH THE ID OF deleteId
    setEvents(deleteEvents); // !! SET events TO THE NEWLY FILTERED LIST WITHOUT THE SPECIFIED deleteId
  };

  // get username data from UserTable.js
  const dataFromTable = (childData) => {
    const favEvents = [];
    if (childData === null) {
      // if there are no favorited events
      if (typeof dataToApp === "function") {
        // this was added because npm run test was giving me an error
        dataToApp([]); // send nothing to App.js
      }
    } else {
      childData[username].map((data) => favEvents.push(events[data].name)); // get the user specific favorited events
      dataToApp(favEvents); // send the list of favorite events to App.js
    }
  };

  return (
    // will only show the list of events if the user inputted a valid username
    <section
      className="event-management"
      style={{ display: username === "" ? "none" : "block" }}
    >
      <h2>Event Management</h2>
      <div>
        <h3>All Events</h3>
        <div className="card">
          <div className="card-header">
            Events
            {/* sort list of events by id */}
            <button
              style={{ border: "solid" }}
              onClick={() => setSort("sortedId")}
            >
              Sort By Id
            </button>
            {/* sort list of events by date */}
            <button
              style={{ border: "solid" }}
              onClick={() => setSort("sortedDate")}
            >
              Sort By Date
            </button>
            {/* sort list of events by name */}
            <button
              style={{ border: "solid" }}
              onClick={() => setSort("sortedName")}
            >
              Sort By Name
            </button>
            {/* sort list of events by category */}
            <button
              style={{ border: "solid" }}
              onClick={() => setSort("sortedCategory")}
            >
              Sort By Category
            </button>
            <span>
              {/* search and filter the events by name */}
              <input
                type="text"
                placeholder="Search by name.."
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setField("name");
                }}
              />
              {/* search and filter the events by date*/}
              <input
                type="date"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setField("date");
                }}
              />
              {/* search and filter the events by category */}
              <input
                type="text"
                placeholder="Search by category.."
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setField("category");
                }}
              />
            </span>
          </div>
          {/* generates table of events
            accepts: a list of the events obtained from the fetch request,
            the callback function to send the id you want to delete to Events.js
            the search input to filter the names by what was typed, 
            the field which is either name, date, or category that we will search by,
            the username from Users.js, and
            the callback function to send favEvents data to Events.js */}
          <EventTable
            events={events}
            deleteEvent={deleteEvent}
            searchInput={searchInput}
            field={field}
            dataToEvent={dataFromTable}
            username={username}
          />
        </div>
      </div>
    </section>
  );
};

export default EventManagement;

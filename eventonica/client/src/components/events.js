import { useState, useEffect } from "react";
import EventTable from "./EventTable";

const EventManagement = ({ username, dataToApp }) => {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [field, setField] = useState("");
  const [sort, setSort] = useState("");

  const getEvents = async (param) => {
    const response = await fetch(`http://localhost:4000/events/${param}`);
    const data = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    getEvents(sort);
  }, [events]);

  const deleteEvent = async (deleteId) => {
    let response = await fetch(`http://localhost:4000/events/${deleteId}`, {
      method: "DELETE",
    });
    await response.json();

    const deleteEvents = events.filter(
      (event) => event.id !== Number(deleteId)
    );
    setEvents(deleteEvents);
  };

  const dataFromTable = (childData) => {
    const favEvents = [];
    if (childData === null) {
      if (typeof dataToApp === "function") {
        dataToApp([]);
      }
    } else {
      childData[username].map((data) => favEvents.push(events[data].name));
      dataToApp(favEvents);
    }
  };

  return (
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
            <button
              style={{ border: "solid" }}
              onClick={() => setSort("sortedId")}
            >
              Sort By Id
            </button>
            <button
              style={{ border: "solid" }}
              onClick={() => setSort("sortedDate")}
            >
              Sort By Date
            </button>
            <button
              style={{ border: "solid" }}
              onClick={() => setSort("sortedName")}
            >
              Sort By Name
            </button>
            <button
              style={{ border: "solid" }}
              onClick={() => setSort("sortedCategory")}
            >
              Sort By Category
            </button>
            <span>
              <input
                type="text"
                placeholder="Search by name.."
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setField("name");
                }}
              />
              <input
                type="date"
                // placeholder="YYYY-MM-DD"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setField("date");
                }}
              />
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

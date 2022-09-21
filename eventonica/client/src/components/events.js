import { useState, useEffect } from "react";
import EventTable from "./EventTable";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getEvents = async () => {
    const response = await fetch("http://localhost:4000/events");
    const data = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    getEvents();
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

  return (
    <section className="event-management">
      <h2>Event Management</h2>
      <div>
        <h3>All Events</h3>
        <div className="card">
          <div className="card-header">
            Events
            <span>
              <input
                type="text"
                placeholder="Search by name.."
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </span>
          </div>
          <EventTable
            events={events}
            deleteEvent={deleteEvent}
            searchInput={searchInput}
          />
        </div>
      </div>
    </section>
  );
};

export default EventManagement;

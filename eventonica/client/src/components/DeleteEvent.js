import { useState } from "react";

const DeleteEvent = ({ deleteEvent }) => {
  const [eventId, setEventId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteEvent(eventId);
    setEventId("");
  };
  return (
    <>
      <h3>Delete Event</h3>
      <form id="delete-event" action="#" onSubmit={handleSubmit}>
        <fieldset>
          <label>Event ID: </label>
          <input
            type="text"
            id="delete-event-id"
            name="eventId"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
        </fieldset>
        <input type="submit" />
      </form>
    </>
  );
};

export default DeleteEvent;

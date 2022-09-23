// Note: will be capitalizing the comments for crucial and necessary lines of code or functions, CTRL+F and type !!  to find
// !! THIS ONE IS OPTIONAL IF YOU HAVE A DELETE ICON OR BUTTON, EVERYTHING IS IMPORTANT IF YOU WANT TO USE THIS COMPONENT
import { useState } from "react"; // import useState to create and update states

const DeleteEvent = ({ deleteEvent }) => {
  // accepts the callback function to send data up to Events.js as props
  const [eventId, setEventId] = useState(""); // stores the user inputted id

  // what to do on form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // won't refresh page
    deleteEvent(eventId); // send the user inputted id up to Events.js to be deleted
    setEventId(""); // reset input so you can delete multiple ids
  };
  return (
    <>
      <h3>Delete Event</h3>
      {/* delete event form */}
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

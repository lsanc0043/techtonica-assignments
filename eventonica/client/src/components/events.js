import { useReducer, useState } from "react";
const event1 = {
  id: "1",
  name: "Birthday",
  date: "2021-09-01",
  description: "A birthday party for my best friend",
  category: "Celebration",
};

const event2 = {
  id: "2",
  name: "Graduation",
  date: "2021-08-01",
  description: "The class of 2021 graduates from East High",
  category: "Education",
};

const event3 = {
  id: "3",
  name: "JS Study Session",
  date: "2021-10-01",
  description: "A chance to practice Javascript interview questions",
  category: "Education",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "editId":
      console.log("id");
      return { ...state, id: action.payload };
    case "editName":
      console.log("name");
      return { ...state, name: action.payload };
    case "editDate":
      console.log("date");
      return { ...state, date: action.payload };
    case "editDescription":
      console.log("description");
      return { ...state, description: action.payload };
    case "editCategory":
      console.log("category");
      return { ...state, category: action.payload };

    default:
      return state;
  }
};

const EventManagement = () => {
  const [events, setEvents] = useState([event1, event2, event3]);
  const initialState = {
    id: "",
    name: "",
    date: null,
    description: "",
    category: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    setEvents([...events, state]);
    // setNewUser({ name: "", email: "", id: "" });
  };
  return (
    <section className="event-management">
      <h2>Event Management</h2>
      <div>
        <h3>All Events</h3>
        <ul id="events-list">
          {/* Display all Events here */}
          {events.map((event, index) => {
            return (
              <li key={index}>
                Name: {event.name}, Description: {event.description}
              </li>
            );
          })}
        </ul>

        <h3>Add Event</h3>
        <form id="add-event" action="#" onSubmit={handleSubmit}>
          <fieldset>
            {Object.keys(initialState).map((field, index) => {
              return (
                <label>
                  {field[0].toUpperCase() + field.slice(1)}
                  <input
                    type="text"
                    id={`add-event-${field}`}
                    value={state.field}
                    onChange={(e) =>
                      dispatch({
                        type: `edit${field[0].toUpperCase() + field.slice(1)}`,
                        payload: e.target.value,
                      })
                    }
                  />
                </label>
              );
            })}
          </fieldset>
          {/* Add more form fields here */}
          <input type="submit" />
        </form>
        <h3>Delete Event</h3>
        <form id="delete-event" action="#">
          <fieldset>
            <label>Event ID</label>
            <input type="number" min="1" id="delete-event-id" />
          </fieldset>
          <input type="submit" />
        </form>
      </div>
    </section>
  );
};

export default EventManagement;

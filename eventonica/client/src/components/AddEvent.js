// Note: will be capitalizing the comments for crucial and necessary lines of code or functions, CTRL+F and type !!  to find
import { useReducer } from "react"; // !! IMPORT useReducer TO SET STATES OF MULTIPLE THINGS AT ONCE

const DATE = new Date(); // generate a new date with today's date so user cannot select a past date
const initialState = {
  // !! SET THE INITIAL STATE TO BE AN OBJECT WITH EMPTY VALUES
  eventName: "",
  date: "",
  description: "",
  category: "",
};

// !! REDUCER FUNCTION, TAKES A STATE AND AN ACTION, think of const [STATE, ACTION] = useState(INITIALSTATE)
/* how this works: dispatch({ type: "describes what you want to do", payload: "value"}) 
so if type: "editEventName", and the payload is e.target.value of the eventName field, we are setting eventName to e.target.value,
if type: "reset", there is no payload because we don't need any other information since we're just setting everything to "" */
const reducer = (state, action) => {
  switch (action.type) {
    case "editEventName":
      return { ...state, eventName: action.payload }; // set event name without changing other parts of state
    case "editDate":
      return { ...state, date: action.payload }; // set date without changing other parts of state
    case "editDescription":
      return { ...state, description: action.payload }; // set description without changing other parts of state
    case "editCategory":
      return { ...state, category: action.payload }; // set category without changing other parts of state
    case "reset": // reset to initial state
      return {
        eventName: "",
        date: "",
        description: "",
        category: "",
      };
    default:
      return state;
  }
};

const AddEvent = ({ events }) => {
  // !! ACCEPTS THE LIST OF EVENTS AS PROPS
  const [state, dispatch] = useReducer(reducer, initialState); // !! INITIALIZE useReducer, state = initialState, dispatch = reducer

  // !! POST REQUEST TO CONNECT TO BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault(); // won't refresh the page
    const rawResponse = await fetch("http://localhost:4000/events", {
      // fetch request made to this url
      method: "POST", // POST method
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state), // converts state to a JSON
    });
    const content = await rawResponse.json(); // converts response to a JSON
    events.push(content); // add the inputted new event information to the list of events
    dispatch({ type: "reset" }); // reset the new Event
  };
  return (
    <tr>
      <td></td>
      <td></td>
      <td>
        {/* set a minimum date, can't be a past date */}
        <input
          type="date"
          id="add-event-date"
          value={state.date}
          name="date"
          min={DATE.toISOString().slice(0, 10)}
          onChange={(e) =>
            dispatch({ type: "editDate", payload: e.target.value })
          }
        />
      </td>
      <td>
        <input
          type="text"
          id="add-event-name"
          value={state.eventName}
          name="eventName"
          onChange={(e) =>
            dispatch({ type: "editEventName", payload: e.target.value })
          }
        />
      </td>
      <td>
        <input
          type="text"
          id="add-event-descripton"
          value={state.description}
          name="description"
          onChange={(e) =>
            dispatch({ type: "editDescription", payload: e.target.value })
          }
        />
      </td>
      <td>
        <input
          type="text"
          id="add-event-category"
          value={state.category}
          name="category"
          onChange={(e) =>
            dispatch({ type: "editCategory", payload: e.target.value })
          }
        />
      </td>
      <td>
        <input type="submit" value="Add" onClick={handleSubmit} />
      </td>
      <td></td>
    </tr>
  );
};

export default AddEvent;

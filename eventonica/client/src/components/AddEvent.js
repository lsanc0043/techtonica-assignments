import { useReducer } from "react";

const DATE = new Date();
const initialState = {
  eventName: "",
  date: "",
  description: "",
  category: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "editEventName":
      return { ...state, eventName: action.payload };
    case "editDate":
      return { ...state, date: action.payload };
    case "editDescription":
      return { ...state, description: action.payload };
    case "editCategory":
      return { ...state, category: action.payload };
    case "reset":
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawResponse = await fetch("http://localhost:4000/events", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    const content = await rawResponse.json();
    events.push(content);
    dispatch({ type: "reset" });
  };
  return (
    <tr>
      <td></td>
      <td></td>
      <td>
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
    </tr>
  );
};

export default AddEvent;

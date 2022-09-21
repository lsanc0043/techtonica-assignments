import { useState } from "react";
import AddEvent from "./AddEvent";

const EventTable = ({ events, deleteEvent, searchInput }) => {
  const [favorited, setFavorited] = useState([]);
  const filtered = events.filter((event) =>
    event.name.toLowerCase().includes(searchInput)
  );

  const handleClick = (e) => {
    console.log(e.currentTarget.value);
    deleteEvent(e.currentTarget.value);
  };

  const handleFavorite = (e) => {
    console.log(e.currentTarget.value);
    const value = Number(e.currentTarget.value);
    if (favorited.includes(value)) {
      console.log("already there");
      const deleteFavorite = favorited.filter((val) => val !== value);
      console.log(deleteFavorite);
      setFavorited(deleteFavorite);
    }
    favorited.push(value);
  };

  return (
    <table className="table">
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
        {filtered.map((event, index) => {
          return (
            <tr key={index}>
              <td>
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
              <td>
                <button value={event.id} onClick={handleClick}>
                  <i className="fa fa-trash-o"></i>
                </button>
              </td>
            </tr>
          );
        })}
        <AddEvent events={events} />
      </tbody>
    </table>
  );
};

export default EventTable;

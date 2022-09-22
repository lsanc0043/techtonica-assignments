import { useState, useEffect } from "react";
import AddEvent from "./AddEvent";

const EventTable = ({
  events,
  deleteEvent,
  searchInput,
  field,
  dataToEvent,
  username,
}) => {
  const [favorited, setFavorited] = useState([]);
  // eslint-disable-next-line
  const [userFav, setUserFav] = useState({});
  // eslint-disable-next-line
  const [posUsers, setPosUsers] = useState([]);

  const checkExists = () => {
    if (username !== "") {
      if (!posUsers.includes(username)) {
        posUsers.push(username);
        setFavorited([]);
        dataToEvent(null);

        console.log(favorited, "not there");
      } else {
        setFavorited(userFav[username]);
        console.log(favorited, userFav, "is there");
        dataToEvent(userFav);
      }
    }
  };

  useEffect(() => {
    checkExists();
    // eslint-disable-next-line
  }, [username]);

  const filtered = events.filter((event) => {
    switch (field) {
      case "name":
        return event.name.toLowerCase().includes(searchInput.toLowerCase());
      case "date":
        return event.date.includes(searchInput.toLowerCase());
      case "category":
        return event.category.toLowerCase().includes(searchInput.toLowerCase());
      case "":
        return event;
      default:
        // eslint-disable-next-line
        return;
    }
  });

  const handleClick = (e) => {
    console.log(e.currentTarget.value);
    deleteEvent(e.currentTarget.value);
  };

  const handleFavorite = (e) => {
    userFav[username] = [];
    const value = Number(e.currentTarget.value);
    if (favorited.includes(value)) {
      const deleteFavorite = favorited.filter((val) => val !== value);
      setFavorited(deleteFavorite);
      userFav[username] = deleteFavorite;
      // setFav(deleteFavorite);
      console.log(userFav);
      dataToEvent(userFav);
    } else {
      favorited.push(value);
      userFav[username] = favorited;
      // setFav(favorited);
      console.log(userFav);
      dataToEvent(userFav);
    }
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

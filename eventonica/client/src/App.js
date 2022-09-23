import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import UserManagement from "./components/Users";
import EventManagement from "./components/Events";

function App() {
  const [favEvents, setFavEvents] = useState([]); // store results from Events.js callback
  const [username, setUsername] = useState(""); // store results from Users.js callback

  // get list of favorite events from the Events.js and store it in favEvents
  const dataFromEvent = (childData) => {
    setFavEvents(childData);
  };
  // get the user-inputted username from the Users.js and store it in username
  const dataFromUser = (childData) => {
    setUsername(childData);
  };

  return (
    <div className="App">
      {/* move the header into a different component */}
      <Header />
      <main>
        <div className="user-and-events">
          {/* generate the user management features, accepts the callback function and list of fave events from Event.js as props */}
          <UserManagement favEvents={favEvents} dataToApp={dataFromUser} />
          {/* generate the event management features, accepts the callback function and username from Users.js as props */}
          <EventManagement dataToApp={dataFromEvent} username={username} />
        </div>
      </main>
    </div>
  );
}

export default App;

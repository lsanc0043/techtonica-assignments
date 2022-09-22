import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import UserManagement from "./components/Users";
import EventManagement from "./components/Events";

function App() {
  const [favEvents, setFavEvents] = useState([]);
  const [username, setUsername] = useState("");
  const dataFromEvent = (childData) => {
    setFavEvents(childData);
  };
  const dataFromUser = (childData) => {
    setUsername(childData);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <div className="user-and-events">
          <UserManagement favEvents={favEvents} dataToApp={dataFromUser} />
          <EventManagement dataToApp={dataFromEvent} username={username} />
        </div>
      </main>
      {/* <FindEvent /> */}
    </div>
  );
}

export default App;

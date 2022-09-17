import "./App.css";
import Header from "./components/header";
import UserManagement from "./components/users";
import EventManagement from "./components/events";
import FindEvent from "./components/findevent";

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <div className="user-and-events">
          <UserManagement />
          <EventManagement />
        </div>
      </main>

      <FindEvent />
    </div>
  );
}

export default App;

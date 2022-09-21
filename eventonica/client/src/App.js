import "./App.css";
import Header from "./components/Header";
import UserManagement from "./components/Users";
import EventManagement from "./components/Events";
// import FindEvent from "./components/FindEvent";

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
      {/* <FindEvent /> */}
    </div>
  );
}

export default App;

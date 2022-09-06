import "./App.css";
import Students from "./components/students";

function App() {
  return (
    <div className="App">
      <Students school="Hackbright" />
      <Students school="Techtonica" />
    </div>
  );
}

export default App;

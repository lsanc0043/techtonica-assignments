import "./App.css";
import GenNumberGame from "./components/GenNumberGame";
import GenSnakeGame from "./components/GenSnakeGame";

function App() {
  return (
    <div className="App">
      <GenSnakeGame />
      <GenNumberGame />
    </div>
  );
}

export default App;

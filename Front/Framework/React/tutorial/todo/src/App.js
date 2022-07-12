import "./App.css";
import Todo from "./components/Todo";
import CalendarData from "./components/calendars/CalendarData";

function App() {
  return (
    <div className="App container is-fluid">
      <CalendarData />
      <Todo />
    </div>
  );
}

export default App;

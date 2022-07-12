import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { Task } from "./Types";

const initialState: Task[] = [
  {
    id: 2,
    title: "Next todo",
    done: false,
  },
  {
    id: 1,
    title: "First todo",
    done: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(initialState);

  return (
    <div className="container fluid">
      <div>
        <TaskInput tasks={tasks} setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;

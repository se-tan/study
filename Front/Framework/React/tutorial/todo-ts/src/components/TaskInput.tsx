import React, { useState } from "react";
import { Task } from "../Types";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskInput: React.FC<Props> = ({ tasks, setTasks }) => {
  const [inputTitle, setInputTitle] = useState<string>("");
  const [count, setCount] = useState<number>(tasks.length + 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleSubmit = () => {
    setCount(count + 1);

    const newTask: Task = {
      id: count,
      title: inputTitle,
      done: false,
    };

    setTasks([newTask, ...tasks]);
    setInputTitle("");
  };

  return (
    <form className="m-3">
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          value={inputTitle}
          onChange={handleInputChange}
          placeholder="Enter todo..."
        />
        <button onClick={handleSubmit} className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
};

export default TaskInput;

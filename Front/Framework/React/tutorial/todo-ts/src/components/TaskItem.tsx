import classNames from "classnames";
import React from "react";
import { Task } from "../Types";

type Props = {
  task: Task;
  handleDone: (task: Task) => void;
  handleDelete: (task: Task) => void;
};

const TaskItem: React.FC<Props> = ({ task, handleDone, handleDelete }) => {
  return (
    <li className="list-group-item">
      <div className="d-flex">
        <input
          className="form-check mt-2"
          type="checkbox"
          onClick={() => handleDone(task)}
          defaultChecked={task.done}
        />
        <label className="form-label p-2">
          <span
            className={classNames({
              "text-decoration-line-through": task.done,
            })}>
            {task.title}{" "}
          </span>
        </label>
        <button
          className="btn btn-danger ms-auto p-2"
          onClick={() => handleDelete(task)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;

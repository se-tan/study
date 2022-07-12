import React, { useState } from "react";

function TodoList() {
  const initialState = [
    {
      task: "Learn vue.js",
      isCompleted: false,
    },
    {
      task: "Learn Laravel",
      isCompleted: false,
    },
    {
      task: "Learn PHP",
      isCompleted: false,
    },
  ];

  /* todos: variable, setTodo: method */
  const [todos, setTodo] = useState(initialState);
  const [task, setTask] = useState("");

  const handleNewTask = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === "") return;
    setTodo((todos) => [...todos, { task, isCompleted: false }]);
    setTask("");
  };

  // const handleRemoveTask = (index) => {
  //   const newTodos = [...todos].filter((todo, todoIndex) => todoIndex !== index);
  //   setTodo(newTodos);
  // };

  const handleUpdateTask = (index) => {
    let newTodos = todos.map((todo, todoIndex) => {
      if (todoIndex === index) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodo(newTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        Add Task : <input placeholder="Add new task..." onChange={handleNewTask} />
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={todo.isCompleted === true ? { textDecorationLine: "line-through" } : {}}>
            {todo.task}
            <span onClick={() => handleUpdateTask(index)}>X</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

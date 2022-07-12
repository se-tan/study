import React from "react";

import TodoItem from "./TodoItem";
import Input from "./Input";
import Filter from "./Filter";

function Todo() {
  /* Create task ID */
  const getKey = () => Math.random().toString(32).substring(2);
  const [items, setItems] = React.useState([
    { key: getKey(), text: "Learn React", done: false },
    { key: getKey(), text: "Learn PHP", done: false },
    { key: getKey(), text: "Purchase books", done: false },
  ]);
  const handleCheck = (checked) => {
    const newItems = items.map((item) => {
      if (item.key === checked.key) {
        item.done = !item.done;
      }
      return item;
    });
    setItems(newItems);
  };
  const handleAdd = (text) => {
    setItems([...items, { key: getKey(), text, done: false }]);
  };

  /* condition: <ALL, TODO, DONE> */
  const [filter, setFilter] = React.useState("ALL");
  const handleFileterChange = (value) => setFilter(value);

  const displayItems = items.filter((item) => {
    switch (filter) {
      case "ALL":
        return true;
      case "TODO":
        return !item.done;
      case "DONE":
        return item.done;
    }
  });
  return (
    <div className="panel mt-3">
      <div className="panel-heading">React Todo</div>

      <Input onAdd={handleAdd} />
      <Filter onChange={handleFileterChange} value={filter} />
      {displayItems.map((item) => (
        <TodoItem key={item.key} item={item} onCheck={handleCheck} />
      ))}

      <div className="panel-block">{displayItems.length} items</div>
    </div>
  );
}

export default Todo;

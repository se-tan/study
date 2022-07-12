import TodoList from "./components/TodoList";
import Count from "./components/Count";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [posts, setPosts] = useState([]);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      }, []);
  });

  return (
    <div className="App" style={{ margin: "2em" }}>
      <h1>Learn useEffect</h1>
      <h2>
        Count: {count} / Count2: {count2}
      </h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount2(count2 + 2)}>+</button>
      <button onClick={() => setDisplay(!display)}>Toggle</button>
      {display && <Count />}
      <br />

      <div>
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
      <hr />
      <TodoList />
      <hr />
      <Count />
    </div>
  );
}

export default App;

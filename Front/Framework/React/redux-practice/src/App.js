import React from "react";
import "./App.css";
// import Count from "./components/Count";
import { useSelector } from "react-redux";

function App() {
  const count = useSelector((state) => state.countReducer.count);
  return (
    <div className="App">
      <h1>Redux Learning</h1>
      <p>Count: {count}</p>
      {/* <Count /> */}
    </div>
  );
}

export default App;

/* connect function */
// import { connect } from "react-redux";

// function App({ count }) {
//   return (
//     <div className="App">
//       <h1>Redux Learn</h1>
//       <p>Count: {count}</p>
//       <Count />
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return { count: state.count };
// };

// export default connect(mapStateToProps)(App);

import React from "react";
import { useSelector } from "react-redux";

function Count() {
  const count = useSelector((state) => state.count);
  const posts = useSelector((state) => state.posts);
  return (
    <>
      <div>Count component: {count}</div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}

export default Count;

/* connect function */
// import { connect } from "react-redux";

// function Count({ count }) {
//   return (
//     <>
//       <div>Count component: {count}</div>
//     </>
//   );
// }

// const mapStateToProps = (state) => {
//   return { count: state.count };
// };

// export default connect(mapStateToProps)(Count);

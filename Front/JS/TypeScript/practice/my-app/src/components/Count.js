import React, { useEffect, useState } from "react";

function Count() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect was executed.");

    setInterval(() => {
      setCount((count) => count + 1);
      console.log("The count has increased by 1.");
    }, 1000);
  }, []);
  return () => {
    console.log("The component was unmounted.");
  };
}

export default Count;

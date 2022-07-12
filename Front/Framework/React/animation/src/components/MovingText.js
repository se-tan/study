import { useState } from "react";
import { Text, useTick } from "@inlet/react-pixi";
import { TextStyle } from "pixi.js";

function MovingText({ text, posX, posY }) {
  const [dragging, setDragging] = useState(false);
  const [x, setX] = useState(posX);
  const [y, setY] = useState(posY);
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);

  const mouseDown = (e) => {
    let distanceX = e.data.global.x - x;
    let distanceY = e.data.global.y - y;

    setDiffX(distanceX);
    setDiffY(distanceY);

    setDragging(true);

    setX(e.data.global.x - distanceX);
    setY(e.data.global.y - distanceY);
  };
  const mouseMove = (e) => {
    if (dragging) {
      setX(e.data.global.x - diffX);
      setY(e.data.global.y - diffY);
    }
  };
  const mouseUp = () => {
    setDragging(false);
  };

  useTick((delta) => {
    setX(x + 1 * delta);
  });

  return (
    <Text
      text={text}
      x={x}
      y={y}
      interactive={true}
      style={new TextStyle({ fill: "white" })}
      mousedown={mouseDown}
      mousemove={mouseMove}
      mouseup={mouseUp}
    />
  );
}

export default MovingText;

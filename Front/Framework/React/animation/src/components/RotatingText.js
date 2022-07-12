import { useState } from "react";
import { Text, useTick } from "@inlet/react-pixi";
import { TextStyle } from "pixi.js";

function RotatingText() {
  const [rotation, setRotation] = useState(0);
  const [color, setColor] = useState("white");
  useTick((delta) => {
    setRotation(rotation + 0.01 * delta);
  });
  return (
    <Text
      text="Hello World"
      x={100}
      y={100}
      rotation={rotation}
      interactive={true}
      anchor={0.5}
      style={new TextStyle({ fill: color })}
      click={() => {
        setColor("red");
      }}
      mousedown={() => {
        setColor("green");
      }}
    />
  );
}

export default RotatingText;

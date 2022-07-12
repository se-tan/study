import "./App.css";
import { Stage } from "@inlet/react-pixi";
// import RotationgText from "./components/RotatingText";
import MovingText from "./components/MovingText";

function App() {
  const objects = [
    {
      text: "React",
      x: 100,
      y: 100,
    },
    {
      text: "Vue.js",
      x: 200,
      y: 50,
    },
    {
      text: "JavaScript",
      x: 240,
      y: 180,
    },
  ];
  return (
    <Stage>
      {
        objects.map((object,index)=> {
          return (
            <MovingText
              text={object.text}
              posX={object.x}
              posY={object.y}
              key={index}
            />
          )
        })
      }
    </Stage>
  );
}

export default App;

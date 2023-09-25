import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import * as THREE from "three";
import Tunnel from "./components/Tunnel";
import { Html } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import annotations from './annotations.json';


function Buttons() {
    console.log(annotations);
    return (
      <div id="annotationsPanel">
        <ul>
          {annotations.map((a, i) => {
            return (
              <li key={i}>
                <button key={i} className="annotationButton" onClick={() => console.log('Go to annotation')}>
                  {a.title}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

function App() {
  return (
    <>
      <Canvas>
      <color attach="background" args={["#ececec"]} />
      {/* <OrbitControls /> */}
        <ScrollControls pages={5} damping={0.3}>
          {/* <Experience /> */}
          <Tunnel />
        </ScrollControls>
      </Canvas>
      <Buttons/>
    </>
  );
}

export default App;

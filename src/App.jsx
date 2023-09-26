import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll } from "@react-three/drei";
import Tunnel from "./components/Tunnel";
import annotations from './annotations.json';
import { useRef, useState } from "react";
import Welcome from "./pages/Welcome";
import Menu from "./components/menu/menu";

function Buttons({gotoAnnotation}) {
    return (
      <div id="annotationsPanel">
        <ul>
          {annotations.map((a, i) => {
            return (
              <li key={i}>
                <button key={i} className="annotationButton" onClick={() => gotoAnnotation(i)}>
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

  const [target, setTarget] = useState()
  const targetPosition = useRef();
  const [lerping, setLerping] = useState(false)

  function gotoAnnotation(idx) {
    setTarget(annotations[idx].lookAt)
    setLerping(true)
  }
  
  window.onload = function() {
    setTarget(annotations[0].lookAt)
    setLerping(true)
  };
 
  return (
    <>
      <Canvas
      onPointerDown={() => setLerping(false)}
      onWheel={() => setLerping(false)}
      onScroll = {() => setLerping(false)}
      >
        <color attach="background" args={["#ececec"]} />
        <group ref={targetPosition}>
         {/* <ScrollControls pages={5} damping={0.3}>  */}
            <Tunnel position={target} lerping={lerping}/>
           {/* </ScrollControls> */}
        </group>
      </Canvas>
      {/*<Buttons gotoAnnotation={gotoAnnotation} /> */}
      <Menu />
      <Welcome/>
    </>
  );
}

export default App;

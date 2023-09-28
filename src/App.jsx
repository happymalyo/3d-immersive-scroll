import { Canvas, useFrame } from "@react-three/fiber";
import { Bvh, ScrollControls, useScroll } from "@react-three/drei";
import Tunnel from "./components/Tunnel";
import annotations from './annotations.json';
import React, { useRef, useState } from "react";
import Welcome from "./pages/Welcome";
import Menu from "./components/menu/Menu";
import { useSelector, useDispatch } from 'react-redux'
import getIncrementAction from "./app/actions/Increment";
import getZPosition from "./app/actions/GetZPosition";

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
  const position = useSelector((state) => state.position)
  const dispatch = useDispatch()

  // dispatch(getZPosition(15));
  // console.log('Z position',position)


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
      >
        <color attach="background" args={["#ececec"]} />
        <group ref={targetPosition}>
         <ScrollControls pages={5} damping={0.3}> 
            <Bvh>
             <Tunnel position={target} lerping={lerping}/>
            </Bvh>
         </ScrollControls>
        </group>
      </Canvas>
      {/*<Buttons gotoAnnotation={gotoAnnotation} /> */}
      <Menu gotoAnnotation={gotoAnnotation} />
      <Welcome/>
    </>
  );
}

export default App;

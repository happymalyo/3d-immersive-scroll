import { Canvas, useFrame } from "@react-three/fiber";
import { Bvh, ScrollControls, useScroll } from "@react-three/drei";
import Tunnel from "./components/Tunnel";
import annotations from './constants/annotations.json';
import React, { useRef, useState, Suspense } from "react";
import Menu from "./components/menu/Menu";
import { useSelector, useDispatch } from 'react-redux'
import RainScene from "./components/Rain";

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

   function gotoAnnotation(idx) {
    setTarget(annotations[idx].lookAt)
    setLerping(true)
  }
  
  window.onload = function() {
    setTarget(annotations[0].lookAt)
    setLerping(true)
  };

 
  return (
    <div style={{ height: '100vh' }}>
      <Canvas
      onWheel={() => setLerping(false)}
      >
        <group ref={targetPosition}>
         <ScrollControls pages={5} damping={0.3}> 
            <Bvh>
             <Tunnel position={target} lerping={lerping}/>
             <RainScene />
            </Bvh>
         </ScrollControls>
        </group>
        
      </Canvas>
      <Menu gotoAnnotation={gotoAnnotation} />
    </div>
  );
}

export default App;

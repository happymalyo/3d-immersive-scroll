import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';


let flash,
rain,
rainCount = 6000;
var M = 0; // actual number of snowflakes
let rainGeo = new THREE.BufferGeometry();
const speeds = [];
var clock = new THREE.Clock( true );

// generate snowflake texture
var canvas = document.createElement('canvas');
    canvas.width = 90;
    canvas.height = 5;
    
var context = canvas.getContext('2d');

var gradient = context.createRadialGradient( 15, 15, 2, 15, 15, 15 );
    gradient.addColorStop( 0.5, 'white' );
    gradient.addColorStop( 1, 'rgba(255,255,255,0)' );

context.fillStyle = gradient;
context.fillRect(0, 0, 60, 10 );

var snowflakeTexture = new THREE.CanvasTexture( canvas );

function RainGeometry() {
    let sizes = [];
    const rainPositions = [];
    for(let i=0; i < rainCount; i++){
      
      rainPositions.push(Math.random()*400-200);
      rainPositions.push(Math.random()*500-250);
      rainPositions.push(Math.random()*400-200);

    //  rainPositions.set(
    //     THREE.MathUtils.randFloatSpread(150), // x
    //     -100 * window.innerHeight,         // y
    //     100                                 // z
    //   );
      

      speeds.push(
        THREE.MathUtils.randFloat(-20, 20), // x speed
        -100,                               // y speed
        0                                   // z speed
      );
    }


      // Set positions and attributes
      rainGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(rainPositions, 3)
      );

    
  
    rainGeo.setAttribute(
        "size",
        new THREE.BufferAttribute(new Float32Array(sizes),1)
    )

    // rainGeo.computeVertexNormals();
  
    const material = new THREE.PointsMaterial({
      color: 0xa0a0ff,
      // color: 0xaaaaaa,
      size: 2,
      map: snowflakeTexture,
      transparent: true,
      opacity:0.4, 
      blending: THREE.AdditiveBlending,
      depthWrite: true
    });
    
    rain = new THREE.Points(rainGeo, material);
    // Point Light
    flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
    flash.position.set(200,300, 100);

    return (
    // Render your rain geometry using rainGeo.current
    <group>
     {/* <primitive object={flash} /> */}
     <primitive object={rain} />
    </group>
  );
}

function animate() {
  const dTime = clock.getDelta();

  if (M < rainCount) M += 5;

  const positions = rainGeo.attributes.position.array;

  for (let i = 0; i < M; i++) {
      const i3 = i * 3;
      const i3Speed = i * 3;

      positions[i3] += speeds[i3Speed] * dTime;
      positions[i3 + 1] += speeds[i3Speed + 1] * dTime;

      // Adjust the condition for acceleration based on your desired effect
      if (speeds[i3Speed + 1] > -600 -(1 % 600)) speeds[i3Speed + 1] -= 5; 

      //Recycle
      if (positions[i3 + 1] < - window.innerHeight / 2) {
          positions[i3 + 1] = window.innerHeight / 2 + Math.random() * 100; // Use Math.random() for more natural variation
          positions[i3] = Math.random() * 400 - 200;
          positions[i3 + 2] = Math.random() * 300 - 200;

          // Adjust the range of random speeds for a more natural look
          speeds[i3Speed] = THREE.MathUtils.randFloat(-20, 20); 
          speeds[i3Speed + 1] = -400;
          speeds[i3Speed + 2] = 0;
      }
  }

  rainGeo.attributes.position.needsUpdate = true;
}



const RainScene = () => {
  useFrame(() => {

    // rainGeo.attributes.size.array.forEach((r, i) => {
    //   r += 0.1; // Randomize raindrop sizes
    // })

    // rainGeo.verticesNeedUpdate = true;
    // rain.rotation.z += 0.005
    // rain.position.y -=  6; // Randomize raindrop sizes
    // if(rain.position.y < -100) {
    //     rain.position.y = 0;
    // }

    animate();

  })

  return (
    <>
      <RainGeometry/>
    </>
  );
};

export default RainScene;
import React, {useEffect} from 'react';
import * as THREE from 'three';
import { PerspectiveCamera} from '@react-three/drei/core';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';


let cloudParticles = [],
rainParticles = [],
flash,
rain,
rainGeo,
rainCount = 15000;

function RainGeometry() {
    // Initialize rain particles
    rainGeo = new THREE.BufferGeometry();
    
    let positions = [];
    let sizes = [];
  
    for(let i=0; i < rainCount; i++){
      positions.push(Math.random()*300-200);
      positions.push(Math.random()*400-250);
      positions.push(Math.random()*300-200);
      sizes.push(20);
    }
   
    rainGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions),3)
    )
  
    rainGeo.setAttribute(
        "size",
        new THREE.BufferAttribute(new Float32Array(sizes),1)
    )

    rainGeo.computeVertexNormals();
  
    const material = new THREE.PointsMaterial({
      size: 0.01, // Adjust the size of raindrops
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      color: 0xaaaaaa,
    });
    
    rain = new THREE.Points(rainGeo, material);

    // Point Light
    flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
    flash.position.set(200,300, 100);

    return (
    // Render your rain geometry using rainGeo.current
    <group>
     <primitive object={flash} />
     <primitive object={rain} />
    </group>
  );
}


const RainScene = () => {
  useFrame(() => {
    if(!rainGeo) {
      return;
    }

    rainGeo.attributes.size.array.forEach((r, i) => {
      r += 0.1; // Randomize raindrop sizes
    })

    rainGeo.verticesNeedUpdate = true;
    rain.rotation.z += 0.005
    rain.position.y -=  6; // Randomize raindrop sizes
    if(rain.position.y < -100) {
        rain.position.y = 0;
    }

  })
  return (
    <>
      <RainGeometry/>
    </>
  );
};

export default RainScene;
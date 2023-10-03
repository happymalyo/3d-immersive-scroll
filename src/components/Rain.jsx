import React from 'react';
import * as THREE from 'three';
import { PerspectiveCamera} from '@react-three/drei/core';
import { useRef } from 'react';

function RainGeometry() {
    const rainGeoRef = useRef();
  
    // Initialize rain particles
    const rainCount = 12000;

    const rainGeo = new THREE.BufferGeometry();
    
    let positions = [];
    let sizes = [];
  
    for(let i=0; i < rainCount; i++){
      positions.push(Math.random()*400-200);
      positions.push(Math.random()*500-250);
      positions.push(Math.random()*400-200);
      sizes.push(30);
    }
  
    rainGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions),3)
    )
  
    rainGeo.setAttribute(
        "size",
        new THREE.BufferAttribute(new Float32Array(sizes),1)
    )
  
    const material = new THREE.PointsMaterial({
      size: 1, // Adjust the size of the raindrops
      color: 0xaaaaaa, 
      transparent: true,
      opacity: 0.7,
    });

    let rain = new THREE.Points(rainGeo, material);


    return (
    // Render your rain geometry using rainGeo.current
    <group>
     <primitive object={rain} />
    </group>
  );
}

const RainScene = () => {

  return (
    <>
      <group>
        <ambientLight intensity={0.55} />
        <PerspectiveCamera makeDefault position={[0, 0, 1]} rotation={[1.16, -0.12, 0.27]} fov={60} near={1} far={1000} />
        <directionalLight  color={0xffeedd} position={[0, 0, 1]} />
        <pointLight color={0x062d89} intensity={30} distance={500} decay={1.7} position={[200, 300, 100]} />
        <fog attach="fogExp2" args={[0x11111f, 0.002]} />
        <RainGeometry/>
      </group>
    </>
  );
};

export default RainScene;
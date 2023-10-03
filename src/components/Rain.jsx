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
rainCount = 12000;

function RainGeometry() {
    // Initialize rain particles
    rainGeo = new THREE.BufferGeometry();
    
    let positions = [];
    let sizes = [];
  
    for(let i=0; i < rainCount; i++){
      positions.push(Math.random()*400-200);
      positions.push(Math.random()*500-250);
      positions.push(Math.random()*400-200);
      sizes.push(15);
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


function animate() {
  cloudParticles.forEach((p) => {
      p.rotation.z -= 0.002;
  });
  rainGeo.attributes.size.array.forEach((r, i) => {
      r += 0.3
  })

  rainGeo.verticesNeedUpdate = true;

  rain.position.z -= 0.222;
  if(rain.position.z < -200) {
      rain.position.z = 0;
  }

  if(Math.random() > 0.95 || flash.power > 100) {
      if(flash.power > 100)
      flash.position.set(Math.random() * 400, 300, + Math.random() * 200, 100);
      flash.power = 50 + Math.random() * 500;
  }
  requestAnimationFrame(animate)
}


const RainScene = () => {
  useFrame(() => {
    animate();
  })
  return (
    <>
      <group>
        <ambientLight intensity={0.55} />
        <PerspectiveCamera makeDefault position={[0, 0, 1]} rotation={[1.16, -0.12, 0.27]} fov={60} near={1} far={1000} />
        <directionalLight  color={0xffeedd} position={[0, 0, 1]} />
        <pointLight color={0x062d89} intensity={30} distance={500} decay={1.7} position={[200, 300, 100]} />
        <fog attach="fogExp2" args={[0x11111f, 0.002]} />
        <group>
         <RainGeometry/>
        </group>
      </group>
    </>
  );
};

export default RainScene;
import React, { useMemo,useRef } from 'react';
import * as THREE from 'three';
import { useScroll, Text, Environment } from '@react-three/drei';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import annotations from '../annotations.json';
import { Mountain } from './mountain';
import LensFlare from "./utils/UltimateLensFlare";
import {BlendFunction } from 'postprocessing'
// Remember to adjust the path to match your project's structure
import { fadeOnBeforeCompileFlat } from './utils/fadeMaterial';
import { EffectComposer } from '@react-three/postprocessing'
import { Background } from './Background';


function MyText(){
  return(
    <>
    {annotations.map((a, i) => {
      return (
        <group key={i} position={[a.lookAt.x,a.lookAt.y,a.lookAt.z]}>
          <Text
                color="white"
                anchorX={"center"}
                anchorY="middle"
                fontSize={0.17}
                textAlign="center"
                maxWidth={4}
                font={"./fonts/Inter-Regular.ttf"}
              >
                {a.title}
                <meshStandardMaterial
                  color={"white"}
                  onBeforeCompile={fadeOnBeforeCompileFlat}
                />
            </Text>
        </group>
      )
    })}
    </>
  )
}

const LINE_NB_POINTS = 300;
const Tunnel = ({position,lerping}) => { 
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
          [
            new THREE.Vector3(-0.1, 1, 0.36),
            new THREE.Vector3(-1, 0, -20),
            new THREE.Vector3(-2, 0, -30),
            new THREE.Vector3(0, 0, -40),
            new THREE.Vector3(1, 0, -50),
            new THREE.Vector3(2, 0, -60),
            new THREE.Vector3(1, 0, -60),
            new THREE.Vector3(1, 0, -70),
            new THREE.Vector3(0, 0, -80),
            new THREE.Vector3(0, 0, -82),
            new THREE.Vector3(0, 0, -90),
            new THREE.Vector3(0, 0, -95),
            new THREE.Vector3(0, 0, -102),
            new THREE.Vector3(0, 0, -150),
            new THREE.Vector3(0, 0, -180),
          ],
          false,
          "catmullrom",
          0.5
        );
      }, []);
    
      const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
      }, [curve]);

      // console.log('linePoints', linePoints[0])
      
      // return;


    //  References Refs
      const cameraGroup = useRef();
      const scroll = useScroll();


    useFrame((_state, delta) => {
      const curPointIndex = Math.min(
        Math.round(scroll.offset * linePoints.length),
        linePoints.length - 1
      );
      const curPoint = linePoints[curPointIndex];

      if(lerping){
        cameraGroup.current.position.lerp(position, delta * 2);
      }else{
        // Camera statique
        // cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);
        cameraGroup.current.position.lerp(curPoint, delta * 2);
      }
   
      });

  return (
    <>
      <ambientLight intensity={0.55} /> 
      <directionalLight  color={0xffeedd} position={[0, 0, 1]} />
      <pointLight color={0x062d89} intensity={30} distance={500} decay={1.7} position={[200, 300, 100]} />
      <fog attach="fogExp2" args={[0x11111f, 0.002]} />
      <group ref={cameraGroup}>
      <PerspectiveCamera position={[0, 0, 5]}  makeDefault />
        <Background/>
        <EffectComposer>
            <LensFlare
              dirtTextureFile={"./background/sunset.png"}
              blendFunction={BlendFunction.SKIP}
              position={{x: -18, y: 7, z: -100}}
              // followMouse={true}
            />
          </EffectComposer>
        {/* <Environment
              files="./background/sky2.hdr"
              blur={0}
              background
        /> */}
      </group>

      
       {/* Model Mountain */}
      <Mountain opacity={0.5} scale={[1, 0.6, 0.3]} position-y={-1.5}/>
      <Mountain opacity={0.5} scale={[1.5, 0.19, 0.5]} position-y={-1.5} position-x={-2} position-z={-6} />
      <Mountain opacity={0.5} scale={[1.5, 0.19, 0.4]} position-y={-1} position-x={2} position-z={-12} />
      <Mountain opacity={0.5} scale={[1, 0.19, 1]} position-y={-1.5} position-x={2} position-z={-75} />
      <Mountain opacity={0.5} scale={[1, 0.19,0.5]} position-y={-0.5} position-x={-4} position-z={-40} />
      <Mountain opacity={0.5} scale={[1, 0.19,0.5]} position-y={-0.5} position-x={-4} position-z={-100} />
      <Mountain opacity={0.5} scale={[1, 0.19,0.5]} position-y={-0.5} position-x={-4} position-z={-175} />
      {/* TEXT : Near towards far*/}
      <group position={[-0.1,0.5,-1.3]}>
          <Text
                color="white"
                anchorX={"center"}
                anchorY="middle"
                fontSize={0.6}
                textAlign="center"
                fillOpacity={1}
                maxWidth={6}
                letterSpacing={0.3}
                // font={"./fonts/Inter-Regular.ttf"}
              >
                Emmanuel
            </Text>
        </group>
      <MyText />
    </>
  )
}

export default Tunnel
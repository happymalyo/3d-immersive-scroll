import React, { useMemo,useRef } from 'react';
import * as THREE from 'three';
import { useScroll, Text, Environment } from '@react-three/drei';
import { Background } from './Background';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import annotations from '../annotations.json';
import { Mountain } from './mountain';
import { Cloud } from "./Cloud";
import { fadeOnBeforeCompile, fadeOnBeforeCompileFlat } from './utils/fadeMaterial';

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
                fontSize={0.15}
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
        // cameraGroup.current.position.y = position.y - 0.2
      }else{
        // console.log('lerping',position)
        // console.log('curPoint',curPoint)
        // Camera statique
        // cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);
        cameraGroup.current.position.lerp(curPoint, delta * 2);
      }
   
      });

  return (
    <>
      <ambientLight intensity={1} />
      <group ref={cameraGroup}>
        <Background/>
        <Environment
          files="./background/sky1.hdr"
          blur={0}
          background
        />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
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
                maxWidth={6}
                letterSpacing={0.3}
                font={"./fonts/Inter-Regular.ttf"}
              >
                Emmanuel
            </Text>
        </group>
        <Cloud opacity={0.1} 
        scale={[0.3, 0.3, 0.3]} 
        position={[-2, 0.5, -3]} 
        />
      <MyText />
    </>
  )
}

export default Tunnel
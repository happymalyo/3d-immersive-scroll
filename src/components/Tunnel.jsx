import React, { useMemo,useRef } from 'react';
import * as THREE from 'three';
import { useScroll, Text } from '@react-three/drei';
import { Background } from './Background';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import annotations from '../annotations.json';

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
                fontSize={0.22}
                textAlign="center"
                maxWidth={4}
                font={"./fonts/Inter-Regular.ttf"}
              >
                {a.title}
            </Text>
        </group>
      )
    })}
    </>
  )
}
const LINE_NB_POINTS = 15000;
const Tunnel = ({position,lerping}) => { 
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
          [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, -10),
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
          ],
          false,
          "catmullrom",
          0.5
        );
      }, []);

      const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.08);
        shape.lineTo(0, 0.08);
    
        return shape;
      }, [curve]);
    
      const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
      }, [curve]);


    //  References Refs
      const cameraGroup = useRef();
      // const scroll = useScroll();


    useFrame((_state, delta) => {

      if(lerping){
        cameraGroup.current.position.lerp(position, delta * 2);
      }
   
        // const curPointIndex = Math.min(
        //   Math.round(scroll.offset * linePoints.length),
        //   linePoints.length - 1
        // );
        // const curPoint = linePoints[curPointIndex];
        // const pointAhead =
        //   linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
    
        // const xDisplacement = (pointAhead.x - curPoint.x) * 80;
    
        // // Math.PI / 2 -> LEFT
        // // -Math.PI / 2 -> RIGHT
    
        // const angleRotation =
        //   (xDisplacement < 0 ? 1 : -1) *
        //   Math.min(Math.abs(xDisplacement), Math.PI / 3);
    
        // const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
        //   new THREE.Euler(
        //     cameraGroup.current.rotation.x,
        //     angleRotation,
        //     cameraGroup.current.rotation.z
        //   )
        // );
    
        // cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);
        // if(lerping){
        //   cameraGroup.current.position.lerp(position, delta * 2);
        // }else
        // {
        //   cameraGroup.current.position.lerp(curPoint, delta * 2);
        // }
      });

  return (
    <>
      <ambientLight intensity={1} />
      <group ref={cameraGroup}>
        <Background/>
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
      </group>
        {/* LINE */}
      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial
            color={"white"}
            opacity={1}
            transparent
            envMapIntensity={2}
          />
        </mesh>
      </group>

      {/* TEXT : Near towards far*/}
      <MyText />
    </>
  )
}

export default Tunnel
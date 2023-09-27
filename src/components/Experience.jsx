import {  PerspectiveCamera, useScroll } from "@react-three/drei";
import {  useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, Component, Suspense } from "react";
import * as THREE from "three";
import { Background } from "./Background";
import { Cloud } from "./Cloud";
import { Mountain } from "./mountain";
import { Text } from "@react-three/drei";
import { Html } from "@react-three/drei";
import LoginPage from "./LoginPage";

const LINE_NB_POINTS = 12000;

export const Experience = () => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -10),
        new THREE.Vector3(-2, 0, -20),
        new THREE.Vector3(-3, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(3, 0, -50),
        new THREE.Vector3(4, 0, -60),
        new THREE.Vector3(6, 0, -60),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(0, 0, -90),
        new THREE.Vector3(0, 0, -100),
        new THREE.Vector3(0, 0, -176),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);



  const cameraGroup = useRef();
  const scroll = useScroll();
  const [htmlPosition, setHtmlPosition] = useState({ x: 8, y: 0, z: -5});

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );
    const curPoint = linePoints[curPointIndex];
    console.log(curPoint)
    const htmlPositionZ = curPoint.z === 0 ? -5 : curPoint.z * (-10)
    const htmlPositionY = curPoint.y === 0 ? 0 : curPoint.y * (-5)
    const htmlPositionX = curPoint.x === 0 ? 8 : curPoint.x * (-10)
    // const htmlPositionY = 
    // Updating HTML position based on curPoint or other criteria
    setHtmlPosition({ x: htmlPositionX, y: htmlPositionY, z: htmlPositionZ });
    const pointAhead =
      linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

    const xDisplacement = (pointAhead.x - curPoint.x) * 80;

    // Math.PI / 2 -> LEFT
    // -Math.PI / 2 -> RIGHT

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 3);

    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current.rotation.x,
        angleRotation,
        cameraGroup.current.rotation.z
      )
    );

    cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);
    cameraGroup.current.position.lerp(curPoint, delta * 2);
  });

  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}
      <ambientLight intensity={1} />
      <group ref={cameraGroup}>
        <Background/>
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
      </group>
      <group scale={[0.3,0.3,0.3]}>
        <Html position={[htmlPosition.x, htmlPosition.y, htmlPosition.z]} transform>
          <LoginPage />
        </Html>
      </group>
        

      {/* TEXT */}
      <group position={[-0.2, 0, -101]}>
        <Text
          color="white"
          anchorX={"center"}
          anchorY="middle"
          fontSize={1}
          textAlign="center"
          maxWidth={4}
          font={"./fonts/Inter-Regular.ttf"}
          // marginBottom= {2}
        >
          ORIZON{"\n"}
        </Text>
        <Text
          color="white"
          anchorX={"center"}
          anchorY="middle"
          fontSize={0.22}
          textAlign="center"
          maxWidth={4}
          font={"./fonts/Inter-Regular.ttf"}
        >
          Welcome . Share . Innovate
        </Text>
      </group>
      <group position={[-1, 0, -10]}>
        <Text
          color="white"
          anchorX={"right"}
          anchorY="middle"
          fontSize={0.12}
          textAlign="center"
          maxWidth={2}
          font={"./fonts/Inter-Regular.ttf"}
          // marginBottom= {2}
        >
          EMPLOYEE OF THE DAY{"\n"}
        </Text>
        <Text
          color="white"
          anchorX={"right"}
          anchorY="top"
          fontSize={0.1}
          textAlign="center"
          maxWidth={2}
          font={"./fonts/Inter-Regular.ttf"}
        >
          Tiana Ravao
        </Text>
      </group>
      {/* CLOUDS */}
      <Cloud opacity={0.5} 
      scale={[0.3, 0.3, 0.3]} 
      position={[-2, 1, -3]} 
      />
      <Cloud opacity={0.5} scale={[0.2, 0.3, 0.4]} position={[1.5, -0.5, -2]} />
      <Cloud
        opacity={0.7}
        scale={[0.3, 0.3, 0.4]}
        rotation-y={Math.PI / 9}
        position={[2, -0.2, -2]}
      />
      <Cloud
        opacity={0.5}
        scale={[0.3, 0.3, 0.4]}
        position={[-2, 0, -12]}
      />
      <Cloud
        opacity={0.7}
        scale={[0.4, 0.4, 0.4]}
        rotation-y={Math.PI / 9}
        position={[1, -0.2, -12]}
      />
      <Cloud opacity={0.7} scale={[0.5, 0.5, 0.5]} position={[-1, 1, -53]} />
      <Cloud opacity={0.3} scale={[0.8, 0.8, 0.8]} position={[0, 1, -103]} />

      {/* Mountain */}
      <Cloud opacity={0.7} scale={[0.4, 0.3, 0.4]} position={[1.5, -0.6, 1]} />
      <Cloud opacity={0.7} scale={[0.4, 0.3, 0.4]} position={[-1, -0.8, 1]} />
      <Mountain opacity={0.5} scale={[0.3, 0.3, 0.3]} position-y={-1.5} />
      <Mountain opacity={0.5} scale={[0.3, 0.3, 0.3]} position-y={-1.5} position-x={-2} position-z={-6} />
      <Mountain opacity={0.5} scale={[0.3, 0.3, 0.3]} position-y={-1.5} position-x={2} position-z={-12} />
      <Mountain opacity={0.5} scale={[0.3, 0.3, 0.3]} position-y={-1.5} position-x={2} position-z={-6} />
      <Mountain opacity={0.5} scale={[0.3, 0.3, 0.3]} position-y={-1.5} position-x={-4} position-z={-12} />
      {/* <Suspense fallback={null}>
        <RoundedBox position={[-3,1,-30]}  args={[5, 3, 0.25]} radius={0.1} smoothness={4}>
          <Html  className="content">
            <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
              <h2>MArio dsfdsfsd</h2>
            </div>
          </Html>
          <meshLambertMaterial attach="material" color={"grey"} />
        </RoundedBox>
      </Suspense> */}
    </>
  );
};

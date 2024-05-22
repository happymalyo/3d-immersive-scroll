/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: artfromheath (https://sketchfab.com/artfromheath)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/snowy-mountain-v2-terrain-4c70cd82edd44951b7af6c144545df34
Title: Snowy Mountain V2 - Terrain
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Mountain(props) {
  const { nodes, materials } = useGLTF("./models/mountain/model.glb");
  return (
    <group scale={[0.3,0.3,100]} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials["Material.001"]}
          material-color = {"#11181F"}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials["Material.001"]}
          material-color = {"#11181F"}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./models/mountain/model.glb");

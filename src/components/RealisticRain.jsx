import React, {useEffect} from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const N = 3000; // number of snowflakes
var M = 0; // actual number of snowflakes
var snow;
    
// generate snowflake texture
var canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    
var context = canvas.getContext('2d');

var gradient = context.createRadialGradient( 15, 15, 2, 15, 15, 15 );
    gradient.addColorStop( 0, 'white' );
    gradient.addColorStop( 1, 'rgba(255,255,255,0)' );

context.fillStyle = gradient;
context.fillRect(0, 0, 32, 32 );

var snowflakeTexture = new THREE.CanvasTexture( canvas );

// Initialize snowflakes geometry and speeds
const snowflakesGeometry = new THREE.BufferGeometry();
const snowflakesPositions = [];
const speeds = [];
var clock = new THREE.Clock( true );

function RealisticRain() {
    for (let i = 0; i < N; i++) {
        // snowflakesPositions.push(
        //     Math.random()*300-200, // x
        //     Math.random()*400-250,         // y
        //     Math.random()*300-200                               // z
        // );

        snowflakesPositions.push(
              THREE.MathUtils.randFloatSpread(150), // x
              -0.6 * window.innerHeight,         // y
              0                                   // z
            );
      
        speeds.push(
          THREE.MathUtils.randFloat(-20, 20), // x speed
          -100,                               // y speed
          0                                   // z speed
        );

      }
      
      // Set positions and attributes
      snowflakesGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(snowflakesPositions, 3)
      );

    
        var material = new THREE.PointsMaterial( {
            color: 0xa0a0ff,
            size: 4,
            map: snowflakeTexture,
            transparent: true,
            opacity:0.5, 
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
      
      snow = new THREE.Points(snowflakesGeometry, material);
              
        return (
            <group>
            <primitive object={snow} />
           </group>
        )
}

// Animation loop

function animate() {
    const dTime = clock.getDelta();

    if (M < N) M += 5;

    const positions = snowflakesGeometry.attributes.position.array;

    for (let i = 0; i < M; i++) {
        const i3 = i * 3;
        const i3Speed = i * 3;

        positions[i3] += speeds[i3Speed] * dTime;
        positions[i3 + 1] += speeds[i3Speed + 1] * dTime;

        // Adjust the condition for acceleration based on your desired effect
        if (speeds[i3Speed + 1] > -400 - (1%400)) speeds[i3Speed + 1] -= 5; 

        if (positions[i3 + 1] < -window.innerHeight / 2) {
            positions[i3 + 1] = window.innerHeight / 2 + Math.random() * 100; // Use Math.random() for more natural variation
            positions[i3] = Math.random() * 400 - 200;
            positions[i3 + 2] = Math.random() * 300 - 200;

            // Adjust the range of random speeds for a more natural look
            speeds[i3Speed] = THREE.MathUtils.randFloat(-20, 20); 
            speeds[i3Speed + 1] = -400;
            speeds[i3Speed + 2] = 0;
        }
    }

    snowflakesGeometry.attributes.position.needsUpdate = true;
}

const RealisticRainScene = () => {
    useFrame(()=>{
        animate();
    })

    return (
        <>
          <RealisticRain/>
        </>
      ); 
}

export default RealisticRainScene;

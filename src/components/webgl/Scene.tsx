"use client"
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import Floor from "./Floor";
import Path from "./Path";
import MainCar from "./MainCar";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Background from "./Background";

const Scene = () => {
  return (
    <Canvas shadows>
        <PerspectiveCamera
            makeDefault
            position={[0, 10, 10]}
            rotation={[-Math.PI / 4, 0, 0]}
            fov={40}
        />
        <Background/>
        <Lights />  
        {/* <Floor/> */}
        <MainCar/>
        <OrbitControls/>
        <Path color="#50a0b6" start={[0, 0, 0]} end={[5, 0, -20]} />
    </Canvas>
    )
};

export default Scene;
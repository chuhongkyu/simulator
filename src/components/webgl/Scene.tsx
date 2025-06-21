"use client"
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import Floor from "./Floor";
import Path from "./Path";
import MainCar from "./MainCar";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Background from "./Background";
import pathData from "@/utils/data";
import Map from "./Map";

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
        <Floor/>
        <MainCar/>
        <OrbitControls/>
        <Path points={pathData[0].points} />
        <Map/>
    </Canvas>
    )
};

export default Scene;
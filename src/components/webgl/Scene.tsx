"use client"
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import Floor from "./Floor";

const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [0, 8, 10], fov: 45 }}>
        <Lights />  
        <Floor/>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="white" />
        </mesh>
    </Canvas>
    )
};

export default Scene;
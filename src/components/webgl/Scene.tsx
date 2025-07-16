"use client"
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import Floor from "./Floor";
import Background from "./Background";
import Map from "./object/Map";
import { useEffect, useRef } from "react";
import useUIControllerStore from "@/store/useUIController";
import Nav from "../view/Nav";
import AIPathSystem from "./AIPathSystem";
import OrbitCamera from "./common/OrbitCamera";

const Scene = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const setDragContainerRef = useUIControllerStore(state => state.setDragContainerRef);

    useEffect(() => {
        if (canvasRef.current) {
            setDragContainerRef(canvasRef.current);
        }
    }, [canvasRef]);
    
    return (
        <div ref={canvasRef} className="relative w-full h-full">
            <Nav/>
            <Canvas camera={{ position: [0, 10, 10] }} shadows>
                <Background/>
                <Lights />  
                <Floor/>
                <OrbitCamera/>
                <AIPathSystem debug={true} />
                <Map/>
            </Canvas>
        </div>
    )
};

export default Scene;
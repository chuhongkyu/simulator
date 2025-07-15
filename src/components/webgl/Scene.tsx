"use client"
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import Floor from "./Floor";
import Path from "./Path";
import MainCar from "./MainCar";
import Background from "./Background";
import pathData from "@/utils/data";
import Map from "./object/Map";
import { useEffect, useRef } from "react";
import useUIControllerStore from "@/store/useUIController";
import Nav from "../view/Nav";
import AIPathSystem from "./AIPathSystem";
import { OrbitControls } from "@react-three/drei";

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
                <OrbitControls minDistance={5} makeDefault/>
                <AIPathSystem debug={true} />
                <Map/>
            </Canvas>
        </div>
    )
};

export default Scene;
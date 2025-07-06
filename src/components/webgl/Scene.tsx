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
import { useEffect, useRef } from "react";
import useUIControllerStore from "@/store/useUIController";

const Scene = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const setDragContainerRef = useUIControllerStore(state => state.setDragContainerRef);

    useEffect(() => {
        if (canvasRef.current) {
            setDragContainerRef(canvasRef.current);
        }
    }, [canvasRef]);
    
    return (
        <div ref={canvasRef} className="w-full h-full">
            <Canvas shadows>
                <Background/>
                <Lights />  
                <Floor/>
                <MainCar/>
                {/* <OrbitControls/> */}
                <Path points={pathData[0].points} />
                <Map/>
            </Canvas>
        </div>
    )
};

export default Scene;
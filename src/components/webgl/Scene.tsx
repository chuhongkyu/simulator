"use client"
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import Floor from "./Floor";
import Path from "./Path";
import MainCar from "./MainCar";
import Background from "./Background";
import pathData from "@/utils/data";
import Map from "./Map";
import { useEffect, useRef } from "react";
import useUIControllerStore from "@/store/useUIController";
import Nav from "../view/Nav";

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
                <MainCar/>
                <Path points={pathData[0].points} />
                <Map/>
            </Canvas>
        </div>
    )
};

export default Scene;
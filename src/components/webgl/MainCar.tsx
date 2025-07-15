import Path from "./Path";
import { Car } from "./Car";
import { useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import pathData from "@/utils/data";
import FollowCamera from "./common/FollowCamera";
import OrbitCamera from "./common/OrbitCamera";

const MainCar = () => {
  const carRef = useRef<Group>(null);
  
  const [path, setPath] = useState<[number, number, number][]>(pathData[0].points);
  
  // 경로 추적을 위한 상태들
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const speed = 0.005; // 매우 낮은 속도로 설정
  
  // 부드러운 회전을 위한 상태
  const [targetRotationY, setTargetRotationY] = useState(0);
  const rotationSpeed = 0.05;

  useEffect(() => {
    setPath(pathData[0].points);
  }, []);

  return (
    <>
      <group ref={carRef}>
        <Car renderOrder={4}/>
      </group>
      <OrbitCamera targetRef={carRef}/>
      <FollowCamera 
        debug={true}
        targetRef={carRef} 
        cameraZoom={1} 
        cameraPosition={[0, 10, 10]}
      />
    </>
  );
};

export default MainCar;
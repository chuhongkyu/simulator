import Path from "./Path";
import { Car } from "./Car";
import { useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import pathData from "@/utils/data";
import FollowCamera from "./common/FollowCamera";

const MainCar = () => {
  const carRef = useRef<Group>(null);
  const [path, setPath] = useState<[number, number, number][]>(pathData[0].points);
  
  // 경로 추적을 위한 상태들
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const speed = 0.005; // 매우 낮은 속도로 설정
  
  // 부드러운 회전을 위한 상태
  const [targetRotationY, setTargetRotationY] = useState(0);
  const rotationSpeed = 0.05; // 회전 속도 (0~1, 클수록 빠름)

  useEffect(() => {
    setPath(pathData[0].points);
  }, []);

  useFrame(() => {
    if (carRef.current && path && path.length > 0) {
      // 현재 경로 인덱스와 다음 경로 인덱스
      const currentIndex = Math.floor(currentPathIndex);
      const nextIndex = (currentIndex + 1) % path.length;
      
      // 현재 위치와 다음 위치
      const currentPoint = path[currentIndex];
      const nextPoint = path[nextIndex];
      
      // 두 점 사이의 보간 진행도 (0~1 사이)
      const localProgress = currentPathIndex - currentIndex;
      
      // 현재 점과 다음 점 사이를 선형 보간하여 위치 계산
      const x = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * localProgress;
      const y = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * localProgress;
      const z = currentPoint[2] + (nextPoint[2] - currentPoint[2]) * localProgress;
      
      // 차량 위치 업데이트
      carRef.current.position.set(x, y, z);
      
      // 차량이 다음 점을 향하도록 회전 계산
      const directionX = nextPoint[0] - currentPoint[0];
      const directionZ = nextPoint[2] - currentPoint[2];
      
      // 방향 벡터를 이용해 Y축 회전각 계산 (atan2 사용)
      const newTargetRotationY = Math.atan2(-directionX, -directionZ);
      
      // 목표 회전각 업데이트
      setTargetRotationY(newTargetRotationY);
      
      // 부드러운 회전 적용 (lerp 사용)
      const currentRotationY = carRef.current.rotation.y;
      const smoothedRotationY = currentRotationY + (targetRotationY - currentRotationY) * rotationSpeed;
      
      carRef.current.rotation.y = smoothedRotationY;
      
      // 진행도 업데이트 (매우 천천히)
      setCurrentPathIndex(prevIndex => {
        const newIndex = prevIndex + speed;
        // 경로의 끝에 도달하면 처음으로 돌아가기
        if (newIndex >= path.length) {
          return 0;
        }
        return newIndex;
      });
    }
  });

  return (
    <>
      <group ref={carRef}>
        <Car renderOrder={4}/>
      </group>
      <FollowCamera 
        debug={true}
        id="mainCar" 
        targetRef={carRef} 
        cameraMode="Following" 
        cameraZoom={1} 
        cameraPosition={[0, 10, 10]}
      />
    </>
  );
};

export default MainCar;
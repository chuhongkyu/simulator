import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Quaternion, Vector3, Euler, Mesh } from "three";
import { FollowCameraProps } from "./Camera";
import useUIControllerStore from "@/store/useUIController";
import * as THREE from "three";
import useCameraControllerStore from "@/store/useCameraController";


const FollowCamera: React.FC<FollowCameraProps> = (
  { 
    targetRef, 
    debug = false,
    cameraZoom = 1,
    cameraPosition = [0, 10, 10],
  }) => {

  const { camera, viewport } = useThree();
  const dragContainerRef = useUIControllerStore(state => state.dragContainerRef);
  const cameraMode = useCameraControllerStore(state => state.cameraMode);
  const minZoom = 0.25;
  const maxZoom = 5;
  const zoomSpeed = 0.1;

  const pivotRef = useRef<Mesh | any>(null);

  const makeCamera = () => {
    camera.rotation.set(0, 0, 0)
    pivotRef?.current.add(camera);
    camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
    camera.lookAt(pivotRef?.current.position);
    camera.zoom = cameraZoom;
  }

  useEffect(() => {
    if (cameraMode !== "Following") return;

    const handleWheel = (event: WheelEvent) => {
      camera.zoom = Math.min(maxZoom, Math.max(minZoom, camera.zoom - event.deltaY * zoomSpeed * 0.01));
      camera.updateProjectionMatrix();
    };
  
    const target = dragContainerRef;

    target?.addEventListener("wheel", handleWheel);

    return () => {
        target?.removeEventListener("wheel", handleWheel);
    }
  }, [pivotRef, viewport.width, viewport.height, cameraMode, dragContainerRef]);
  
  // function resetCam() {
  //   pivotRef.current.position.lerp(new Vector3(0,10,10), 0.9);
  //   pivotRef.current.rotation.set(0,0,0)
  // }

  useEffect(()=>{
    if(cameraMode === "Following"){
      if(pivotRef){
        makeCamera();
      }
    }else{
      camera.rotation.set(0, 0, 0)
    }
    
  },[pivotRef, cameraMode])

  useFrame(() => {
    if(cameraMode === "Following"){
      if(targetRef.current){
        followPivotPoint()
      }
      if (pivotRef?.current) {
        // camera.rotation.copy(pivotRef.current.rotation);
        camera.lookAt(pivotRef.current.position);
      }
    }
  });

  function followPivotPoint() {
    if (pivotRef.current && targetRef.current) {
      pivotRef.current.position.copy(targetRef.current.position);
      
      const targetRotation = targetRef.current.rotation.y;
      pivotRef.current.rotation.y = THREE.MathUtils.lerp(
        pivotRef.current.rotation.y, 
        targetRotation,
        0.1
      );
    }
  }

  if(debug) return (
    <mesh ref={pivotRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshToonMaterial color={"red"} wireframe />
    </mesh>
  )

  return (
    <mesh ref={pivotRef}/>
  )
};

export default FollowCamera;

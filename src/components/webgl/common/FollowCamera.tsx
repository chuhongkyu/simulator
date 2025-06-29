import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Quaternion, Vector3, Euler, Mesh } from "three";
import { FollowCameraProps } from "./Camera";
import useUIControllerStore from "@/store/useUIController";


const FollowCamera: React.FC<FollowCameraProps> = (
  { 
    id, 
    targetRef, 
    debug = false,
    cameraMode = "Following",
    cameraZoom = 1,
    cameraPosition = [0, 10, 10],
  }) => {

  const { camera, viewport } = useThree();
  const dragContainerRef = useUIControllerStore(state => state.dragContainerRef);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const minZoom = 0.5;
  const maxZoom = 5;
  const zoomSpeed = 0.05;
  const minX = -80 * (Math.PI / 180);
  const maxX = 180 * (Math.PI / 180);

  const isDraggingRef = useRef(false);
  const pivotRef = useRef<Mesh | any>(null);
  const previousX = useRef(0);
  const previousY = useRef(0);

  const makeCamera = () => {
    camera.rotation.set(0, 0, 0)
    pivotRef?.current.add(camera);
    camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
    camera.lookAt(pivotRef?.current.position);
    camera.zoom = cameraZoom;
  }

  useEffect(() => {
    if (cameraMode !== "Following") return;

    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      previousX.current = event.clientX;
      previousY.current = event.clientY;
    };
  
    const handleMouseMove = (event: MouseEvent) => {
      if (isDraggingRef.current) {
        const deltaX = (event.clientX - previousX.current) / viewport.width;
        const deltaY = (event.clientY - previousY.current) / viewport.height;

        previousX.current = event.clientX;
        previousY.current = event.clientY;

        currentY.current -= deltaX * 0.05;
        currentX.current -= deltaY * 0.05;

        currentX.current = Math.max(minX, Math.min(maxX, currentX.current));

        const combinedEuler = new Euler(
          20 * currentX.current * (Math.PI / 180),
          20 * currentY.current * (Math.PI / 180),
          0,
          "YXZ"
        );

        if (pivotRef.current) {
          const quat = new Quaternion().setFromEuler(combinedEuler);
          quat.normalize();
          pivotRef.current.quaternion.copy(quat);
        }
      }
    };
  
    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };
  
    const handleWheel = (event: WheelEvent) => {
      camera.zoom = Math.min(maxZoom, Math.max(minZoom, camera.zoom - event.deltaY * zoomSpeed * 0.01));
      camera.updateProjectionMatrix();
    };
  
    const target = dragContainerRef;

    target?.addEventListener("mousedown", handleMouseDown);
    target?.addEventListener("mousemove", handleMouseMove);
    target?.addEventListener("mouseup", handleMouseUp);
    target?.addEventListener("wheel", handleWheel);

    return () => {
        target?.removeEventListener("mousedown", handleMouseDown);
        target?.removeEventListener("mousemove", handleMouseMove);
        target?.removeEventListener("mouseup", handleMouseUp);
        target?.removeEventListener("wheel", handleWheel);
    }
  }, [pivotRef, viewport.width, viewport.height, cameraMode, dragContainerRef]);
  
  function resetCam() {
    pivotRef.current.position.lerp(new Vector3(0,0,0), 0.9);
    pivotRef.current.rotation.set(0,0,0)
  }

  useEffect(()=>{
    if(cameraMode === "Following"){
      if(pivotRef){
        makeCamera();
      }
    }
    
  },[pivotRef, cameraMode])

  useFrame(() => {
    if(cameraMode === "Following"){
      if(targetRef.current){
        followPosition()
      }
      if (pivotRef?.current) {
        camera.lookAt(pivotRef.current.position);
      }
    }
  });

  useEffect(()=>{
    if(cameraMode !== "Following"){
      resetCam();
    }
  },[cameraMode])

  function followPosition() {
    if (pivotRef.current && targetRef.current) {
        pivotRef.current.position.copy(targetRef.current.position);
    }
  }

  if(debug) return (
    <mesh ref={pivotRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshToonMaterial color={"red"} wireframe />
    </mesh>
  )

  return (
    <mesh key={id} name={id} ref={pivotRef}/>
  )
};

export default FollowCamera;

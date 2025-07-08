import useCameraControllerStore from "@/store/useCameraController";
import { OrbitControls } from "@react-three/drei";
import { FollowCameraProps } from "./Camera";
import { useEffect, useState } from "react";
import { Vector3 } from "three";

const OrbitCamera: React.FC<FollowCameraProps> = ({targetRef}) => {
    const cameraMode = useCameraControllerStore(state => state.cameraMode);
    const [target, setTarget] = useState<Vector3>(new Vector3(0, 0, 0));

    useEffect(() => {
        if (targetRef.current) {
            setTarget(targetRef.current.position.clone());
        }
    }, [targetRef]);

    return (
        <>
            <OrbitControls 
                target={target}
                minDistance={10}
                maxDistance={100}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                enabled={cameraMode === "Default"}
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
            />
        </>
    )
}

export default OrbitCamera;
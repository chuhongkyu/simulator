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
            console.log(targetRef.current)
            setTarget(targetRef.current.position.clone());
        }
    }, [targetRef, cameraMode]);

    return (
        <>
            <OrbitControls 
                position0={ new Vector3(target.x, target.y + 5 , target.z + 5)}
                target={target}
                minDistance={10}
                maxDistance={100}

                enabled={cameraMode === "Default"}
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
            />
        </>
    )
}

export default OrbitCamera;
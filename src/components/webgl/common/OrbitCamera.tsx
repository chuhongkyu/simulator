import useCameraControllerStore from "@/store/useCameraController";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Vector3 } from "three";

const OrbitCamera = () => {
    const cameraMode = useCameraControllerStore(state => state.cameraMode);
    const [target, setTarget] = useState<Vector3>(new Vector3(0, 0, 0));

    return (
        <>
            <OrbitControls 
                makeDefault
                target0={cameraMode === "Default" ? target: target}
                target={target}
                minDistance={10}
                maxDistance={200}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2} 
                enabled
            />
        </>
    )
}

export default OrbitCamera;
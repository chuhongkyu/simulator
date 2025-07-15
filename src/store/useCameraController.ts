import { CameraModeType } from "@/types/CameraTypes";
import { create } from "zustand";

interface CameraControllerState {
    cameraMode: CameraModeType;
    cameraNumber: number;
    setCameraMode: ({ cameraMode, cameraNumber }:{cameraMode: CameraModeType, cameraNumber: number}) => void;
    
}

const useCameraControllerStore = create<CameraControllerState>((set) => ({
    cameraMode: "Following",
    cameraNumber: 0,
    setCameraMode: ({cameraMode, cameraNumber}) => set({ cameraNumber, cameraMode }),
}));

export default useCameraControllerStore;
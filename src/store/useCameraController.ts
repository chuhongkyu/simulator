import { CameraModeType } from "@/types/CameraTypes";
import { create } from "zustand";

interface CameraControllerState {
    cameraMode: CameraModeType;
    setCameraMode: (cameraMode: CameraModeType) => void;
}

const useCameraControllerStore = create<CameraControllerState>((set) => ({
    cameraMode: "Following",
    setCameraMode: (cameraMode) => set({ cameraMode }),
}));

export default useCameraControllerStore;
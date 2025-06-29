export type CameraModeType = "Following" | "Default";

export interface FollowCameraProps {
    id: string;
    targetRef: any;
    debug?: boolean;
    cameraMode?: CameraModeType;
    cameraZoom?: number;
    cameraPosition?: number[];
    containerRef?: null;
}
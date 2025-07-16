"use client"
import CameraIcon from '@/icon/camera.svg';
import ResetIcon from '@/icon/reset.svg';
import useCameraControllerStore from '@/store/useCameraController';

const Nav = () => {
    const { cameraNumber, cameraMode, setCameraMode } = useCameraControllerStore();

    const handleCameraMode = (id: number) => {
        setCameraMode(
            {
                cameraMode: "Following", 
                cameraNumber: id
            });
    }

    const handleResetCamera = () => {
        setCameraMode({cameraMode: "Default", cameraNumber: 0})
    }
     

    return (
        <nav className="absolute z-10 top-2 right-2 flex bg-white rounded-lg p-2">
            <ul className="flex flex-col gap-2">
                <li>
                    <button 
                        onClick={() => handleCameraMode(0)}
                        className={`p-1 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-center ${
                            cameraMode === "Following" && cameraNumber === 0
                                ? "bg-blue-100 text-blue-600 hover:bg-blue-200" 
                                : "bg-white hover:bg-gray-100"
                        }`}
                    >
                        <CameraIcon className="w-6 h-6" />
                    </button>
                </li>
                <li>
                    <button 
                        onClick={() => handleCameraMode(1)}
                        className={`p-1 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-center ${
                            cameraMode === "Following" && cameraNumber === 1
                                ? "bg-blue-100 text-blue-600 hover:bg-blue-200" 
                                : "bg-white hover:bg-gray-100"
                        }`}
                    >
                        <CameraIcon className="w-6 h-6" />
                    </button>
                </li>
                <li>
                    <button 
                        onClick={() => handleCameraMode(2)}
                        className={`p-1 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-center ${
                            cameraMode === "Following" && cameraNumber === 2
                                ? "bg-blue-100 text-blue-600 hover:bg-blue-200" 
                                : "bg-white hover:bg-gray-100"
                        }`}
                    >
                        <CameraIcon className="w-6 h-6" />
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleResetCamera}
                        className="p-1 bg-white rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer flex items-center justify-center">
                        <ResetIcon className="w-6 h-6" />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
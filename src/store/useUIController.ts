import { create } from "zustand";

const useUIControllerStore = create<{
    dragContainerRef: HTMLDivElement | null;
    setDragContainerRef: (dragContainerRef: HTMLDivElement | null) => void;
}>((set) => ({
    dragContainerRef: null,
    setDragContainerRef: (dragContainerRef) => set({ dragContainerRef }),
}));

export default useUIControllerStore;
import { create } from 'zustand'

export type PathType = 'Main' | 'Sub-1' | 'Sub-2';

type PathColors = {
  [key in PathType]: string;
};

interface AIPathSystemState {
  pathColors: PathColors;
  setPathColor: (path: PathType, color: string) => void;
}

export const useAIPathSystem = create<AIPathSystemState>((set) => ({
  pathColors: {
    'Main': '#009c8f', 
    'Sub-1': '#009c8f',
    'Sub-2': '#009c8f',
  },

  setPathColor: (path, color) =>
    set((state) => ({
      pathColors: {
        ...state.pathColors,
        [path]: color,
      },
    })),
}));

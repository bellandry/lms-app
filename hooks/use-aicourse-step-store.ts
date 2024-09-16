import { create } from "zustand";

type Store = {
  activeIndex: number;
  setActiveIndex: (newState: number) => void; // Correction ici
};

export const useActiveIndexStore = create<Store>()((set) => ({
  activeIndex: 0,
  setActiveIndex: (newState: number) => set(() => ({ activeIndex: newState })),
}));

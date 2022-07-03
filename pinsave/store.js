import create from "zustand";

export const useStore = create((set) => ({
  id: null,
  setUpStore: (id) =>
    set(() => ({
      id: id,
    })),
}));

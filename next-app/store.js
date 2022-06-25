import create from "zustand";

export const useStore = create((set) => ({
  currentUser: null,
  setUpStore: (currentUser) =>
    set(() => ({
      currentUser: currentUser,
    })),
}));

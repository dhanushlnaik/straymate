import { create } from "zustand";

type StateStore = {
  addEventOpen: boolean;
  setAddEventOpen: () => void;
};

export const useStateStore = create<StateStore>((set) => {
  return {
    addEventOpen: false,
    setAddEventOpen: () =>
      set((state) => ({ addEventOpen: !state.addEventOpen })),
  };
});

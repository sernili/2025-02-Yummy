import { create } from "zustand";

type Store = {
  showNavbar: boolean;
};

const useStore = create<Store>()((set) => ({
  showNavbar: false,
}));

export default useStore;

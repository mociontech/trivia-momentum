import { create } from "zustand";

interface UserState {
  cedula: string;
  logged: boolean;
  setCedula: (cedula: string) => void;
  setLogged: (logged: boolean) => void;
}

export const useUser = create<UserState>()((set) => ({
  cedula: "",
  logged: false,
  setCedula: (cedula) => set({ cedula }),
  setLogged: (logged) => set({ logged: logged }),
}));

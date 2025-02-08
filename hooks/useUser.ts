import { create } from "zustand";

interface UserState {
  code: string;
  logged: boolean;
  setCode: (code: string) => void;
  setLogged: (logged: boolean) => void;
}

export const useUser = create<UserState>()((set) => ({
  code: "",
  logged: false,
  setCode: (code) => set({ code }),
  setLogged: (logged) => set({ logged: logged }),
}));

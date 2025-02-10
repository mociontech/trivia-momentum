import { create } from "zustand";

interface UserState {
  score: number;
  code: string;
  logged: boolean;
  setCode: (code: string) => void;
  setScore: (score: number) => void;
  setLogged: (logged: boolean) => void;
}

export const useUser = create<UserState>()((set) => ({
  score: 0,
  code: "",
  logged: false,
  setCode: (code) => set({ code }),
  setLogged: (logged) => set({ logged: logged }),
  setScore: (score) => set({ score }),
}));

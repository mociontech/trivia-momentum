import { create } from "zustand";

interface UserState {
  data: any;
  score: number;
  code: string;
  logged: boolean;
  setCode: (code: string) => void;
  setScore: (score: number) => void;
  setLogged: (logged: boolean) => void;
  setData: (data: any) => void;
}

export const useUser = create<UserState>()((set) => ({
  data: null,
  score: 0,
  code: "",
  logged: false,
  setCode: (code) => set({ code }),
  setLogged: (logged) => set({ logged: logged }),
  setScore: (score) => set({ score }),
  setData: (data) => set({ data }),
}));

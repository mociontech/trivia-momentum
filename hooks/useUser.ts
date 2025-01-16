import { create } from "zustand";

interface UserState {
  mail: string;
  logged: boolean;
  setMail: (mail: string) => void;
  setLogged: (logged: boolean) => void;
}

export const useUser = create<UserState>()((set) => ({
  mail: "",
  logged: false,
  setMail: (mail) => set({ mail: mail }),
  setLogged: (logged) => set({ logged: logged }),
}));

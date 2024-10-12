import { create } from "zustand";

export const useUser = create((set) => ({
  mail: "",
  logged: false,
  setMail: (mail) => set({ mail: mail }),
  setLogged: (logged) => set({ logged: logged }),
}));

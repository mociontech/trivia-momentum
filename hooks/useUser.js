import { create } from "zustand";

export const useMail = create((set) => ({
  mail: "",
  setMail: (mail) => set({ mail: mail }),
}));

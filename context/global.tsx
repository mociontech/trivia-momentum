// src/context/GlobalContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

type GlobalContextType = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  return (
    <GlobalContext.Provider value={{ score, setScore, time, setTime }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debe usarse dentro de GlobalProvider");
  }
  return context;
};

// src/context/GlobalContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

type GlobalContextType = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;

  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState('');

  return (
    <GlobalContext.Provider value={{ score, setScore, userId,setUserId,time,setTime , userName,setUserName}}>
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

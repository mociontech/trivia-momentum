'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';

type AttendeeContextShape = {
  attendeeId: string | null;
  setAttendeeId: (id: string | null) => void;
};

const AttendeeContext = createContext<AttendeeContextShape | undefined>(undefined);

export const AttendeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [attendeeId, setAttendeeId] = useState<string | null>(null);

  return (
    <AttendeeContext.Provider value={{ attendeeId, setAttendeeId }}>
      {children}
    </AttendeeContext.Provider>
  );
};

export const useAttendee = () => {
  const ctx = useContext(AttendeeContext);
  if (!ctx) throw new Error('useAttendee must be used within AttendeeProvider');
  return ctx;
};
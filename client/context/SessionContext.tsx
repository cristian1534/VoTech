'use client'
import React, { createContext, useContext, useEffect, useState } from "react";

interface SessionContextProps {
  sessionToken: string | null;
  setSessionToken: (token: string | null) => void;
  sessionUser: string | null;
  setSessionUser: (name: string | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [sessionUser, setSessionUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("session");
    const user = localStorage.getItem("user");
    setSessionToken(token);
    setSessionUser(user);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        sessionToken,
        setSessionToken,
        sessionUser,
        setSessionUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}

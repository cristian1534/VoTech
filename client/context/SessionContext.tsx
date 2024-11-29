"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface SessionContextProps {
  sessionToken: string | null;
  setSessionToken: (token: string | null) => void;
  sessionUser: string | null;
  setSessionUser: (name: string | null) => void;
  sessionEmail: string | null;
  setSessionEmail: (email: string | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [sessionUser, setSessionUser] = useState<string | null>(null);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");
    const userEmail = Cookies.get("email");

    setSessionToken(token || null);
    setSessionUser(user || null);
    setSessionEmail(userEmail || null);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        sessionToken,
        setSessionToken: (token) => {
          setSessionToken(token);
          if (token) {
            Cookies.set("token", token, { secure: true, sameSite: "strict" });
          } else {
            Cookies.remove("token");
          }
        },
        sessionUser,
        setSessionUser: (user) => {
          setSessionUser(user);
          if (user) {
            Cookies.set("user", user, { secure: true, sameSite: "strict" });
          } else {
            Cookies.remove("user");
          }
        },
        sessionEmail,
        setSessionEmail: (email) => {
          setSessionEmail(email);
          if (email) {
            Cookies.set("email", email, { secure: true, sameSite: "strict" });
          } else {
            Cookies.remove("email");
          }
        },
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

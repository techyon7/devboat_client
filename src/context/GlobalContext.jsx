import React, { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [session, setSession] = useState({
    token: null,
    userId: null,
    username: null,
    userFirstName: null,
    userLastName: null,
    userImg: null
  });

  // Set session based on localStorage when App is mounted
  useEffect(() => {
    const devboatSession = JSON.parse(
      localStorage.getItem('@devboat:session')
    );
    if (devboatSession) {
      setSession(devboatSession);
    }
  }, []);

  // Store session in localStorage when session chaneges
  useEffect(() => {
    localStorage.setItem('@devboat:session', JSON.stringify(session));
  }, [session]);

  return (
    <GlobalContext.Provider
      value={{
        session: session,
        setSession: setSession
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

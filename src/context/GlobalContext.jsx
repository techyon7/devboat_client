import React, { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [session, setSession] = useState({
    token: null,
    userId: null,
    userFirstName: null,
    userLastName: null,
    userImg: null
  });

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

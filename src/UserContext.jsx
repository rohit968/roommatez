import { createContext, useState, useEffect } from "react";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);
  console.log(isLoggedIn);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };

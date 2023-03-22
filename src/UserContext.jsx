import { createContext, useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };

import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const location = useLocation();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else if (!user) {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setUser(null);
    }
  }, [location.pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

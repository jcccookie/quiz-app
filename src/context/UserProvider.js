import React, { useState, createContext } from "react";

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  const login = ({ id, name, email }) => {
    setUser({
      id,
      name,
      email,
    });
  };

  const logout = () => {
    setUser({
      id: "",
      name: "",
      email: "",
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };

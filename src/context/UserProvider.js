import React, { useState, createContext } from "react";

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    auth: false,
  });

  const login = ({ id, name, email }) => {
    setUser({
      id,
      name,
      email,
      auth: true,
    });
  };

  const logout = () => {
    setUser({
      id: "",
      name: "",
      email: "",
      auth: false,
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };

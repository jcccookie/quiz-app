import React, { useState, createContext } from "react";

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    auth: false,
    authId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = ({ id, name, email, authId }) => {
    setUser({
      id,
      name,
      email,
      auth: true,
      authId,
    });
  };

  const logout = () => {
    setUser({
      id: "",
      name: "",
      email: "",
      auth: false,
      authId: "",
    });
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, loading, error, setError, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };

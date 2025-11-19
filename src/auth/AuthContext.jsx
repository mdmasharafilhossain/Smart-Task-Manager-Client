/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";


export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

//   const login = (data) => {
//     localStorage.setItem("token", JSON.stringify(data.token));
    
//     localStorage.setItem("user", JSON.stringify(data.user));
//     setUser(data.user);
//   };
const login = (data) => {
  localStorage.setItem("token", JSON.stringify(data.token));

  const userWithToken = { ...data.user, token: data.token };

  localStorage.setItem("user", JSON.stringify(userWithToken));
  setUser(userWithToken);
};


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";
import api from "../utils/api";


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


  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    try {
      await api.post("/auth/logout"); 
    } catch (e) {
      console.warn("logout request failed", e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

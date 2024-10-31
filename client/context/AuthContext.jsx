import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const iniciarSesion = (token) => {
    setToken(token);
    localStorage.setItem("token", token);  // Asegurarse de almacenar el token
  };

  const cerrarSesion = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

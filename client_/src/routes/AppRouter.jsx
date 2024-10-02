import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "../views/Landing";
import { ReclamosPeticiones } from "../views/ReclamosPeticiones.jsx";
import { Login } from "../views/Login";
import Home from "../views/Home.jsx";
import About from "../views/About.jsx";
import Contact from "../views/Contact.jsx";

const AppRouter = () => {
  // Almacenar el token
  const token = localStorage.getItem("token");
  console.log("Token encontrado:", token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Landing />} />
        {/* Si hay token, redirigir a home, de lo contrario, mostrar Login */}
        <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path="/reclamos" element={<ReclamosPeticiones />} />
        {/* Si hay token, mostrar Home, de lo contrario, redirigir a Login */}
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

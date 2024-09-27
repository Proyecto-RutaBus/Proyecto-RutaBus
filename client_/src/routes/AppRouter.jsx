import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../views/Landing";
import { ReclamosPeticiones } from "../views/ReclamosPeticiones.jsx";
import { Login } from "../views/Login";
import { MapPage } from "../views/Maps.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reclamos" element={<ReclamosPeticiones />} />
        <Route path="/mapa" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;

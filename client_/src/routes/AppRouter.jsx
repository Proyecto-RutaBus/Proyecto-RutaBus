import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../views/Landing";
import { ReclamosPeticiones } from "../views/ReclamosPeticiones.jsx";
import { Login } from "../views/Login";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reclamos" element={<ReclamosPeticiones />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;

import {
  registro,
  login,
  validarSesion,
} from "../controllers/auth.controller.js";
import { validarToken } from "../middleware/validarSesion.js";

import express from "express";
const router = express.Router();

// Creamos una ruta /register con el metodo 'POST' ya que recibiremos datos desde el cliente a traves de este metodo.
router.post("/register", registro);

// Lo mismo que el registro pero con el login.
router.post("/login", login);

// Ruta para validar la sesion.
router.get("/validarSesion", validarToken, validarSesion);

// Exportamos las rutas
export default router;

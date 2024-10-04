import {
  registro,
  login,
  updateUser,
  validarSesion,
} from "../controllers/auth.controller.js";
import { validarToken } from "../middleware/validarSesion.js";

import express from "express";
const router = express.Router();


// Creamos una ruta /register con el metodo 'POST' ya que recibiremos datos desde el cliente a traves de este metodo.
router.post("/register", registro);

// Lo mismo que el registro pero con el login.
router.post("/login", login);

// Ruta para actualizar usuario
router.put("/updateUser", validarToken, updateUser);

// Ruta para validar la sesion.
router.get("/validarSesion", validarToken, validarSesion);

// routes.js (o tu archivo de rutas)

import { verificarAutenticacion } from "../middleware/autenticacion.js";

// Ruta pública (sin autenticación)
router.get("/", (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    return res.redirect("/home");
  }
  res.send("Página de inicio");
});

// Ruta de login (sin autenticación)
router.get("/login", (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    // Si el token existe, redirige a /home
    return res.redirect("/home");
  }
  res.send("Página de login");
});

// Ruta protegida
router.get("/home", verificarAutenticacion, (req, res) => {
  res.send("Página de inicio de sesión");
});


// Exportamos las rutas
export default router;

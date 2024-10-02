import jwt from "jsonwebtoken";
import Usuario from "../models/Usuarios.js";

export const validarToken = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decoded.id).select("-contrasenia"); // Seleccionar todos los campos menos la contraseña
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

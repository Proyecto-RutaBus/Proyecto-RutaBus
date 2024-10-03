// middleware/validarSesion.js
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuarios.js";

export const validarToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecret"); // Usa el secret del .env

    // Buscar el usuario por su ID en MongoDB usando Mongoose
    const usuario = await Usuario.findById(decoded.id).select("-contrasenia");

    // Si el usuario no existe, retornamos un error
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Retornamos los datos completos del usuario
    res.json({
      nombre: usuario.nombre,
      email: usuario.email,
      birthDate: usuario.birthDate,
    });

    // Si necesitas que el middleware continúe en otras rutas
    // req.usuario = usuario;
    // next();

  } catch (error) {
    console.log("Error verificando el token:", error.message);
    return res.status(401).json({ message: "Token inválido" });
  }
};

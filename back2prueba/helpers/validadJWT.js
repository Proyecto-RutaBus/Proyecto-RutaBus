import jwt from "jsonwebtoken";
import Usuario from "../models/Usuarios.js";
import mongoose from "mongoose";

const validarJWT = async (token) => {
  try {
    const secret = process.env.JWT_SECRET || "mysecret";

    // Verificar el token
    const { id } = jwt.verify(token, secret);

    // Verificar que el ID sea válido como string y no un objeto
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    // Buscar al usuario por su ID en MongoDB usando Mongoose
    const usuario = await Usuario.findById(id).select("-contrasenia");

    if (!usuario) {
      return false;
    }

    return usuario;
  } catch (error) {
    console.log("Error verificando el token:", error.message);
    return false;
  }
};

export { validarJWT };

import Usuario from "../models/Usuarios.js";
import bcrypt from "bcrypt";
import { generarJWT } from "../helpers/generarJWT.js";

// Definimos un objeto vacío con el nombre 'ctrl' (abreviatura de controller).
const ctrl = {};

ctrl.registro = async (req, res) => {
  const { nombre, email, contrasenia, FecNac } = req.body;

  const hashedContrasenia = await bcrypt.hash(contrasenia, 10);

  try {
    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contrasenia: hashedContrasenia,
      FecNac,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

ctrl.login = async (req, res) => {
  const { email, contrasenia } = req.body;

  try {
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrectos." });
    }

    // Comparar la contraseña
    const esValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!esValida) {
      return res
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrectos." });
    }

    // Acá generaramos un token JWT
    const token = await generarJWT({ id: usuario._id });

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Funcion para validar la sesion
ctrl.validarSesion = async (req, res) => {
  try {
    // Obtener usuario desde el middleware de autenticación (asumo que el usuario se pasa al req)
    const usuario = req.usuario;

    // Comprobar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Enviar solo el nombre del usuario
    res.json({ message: "Sesion valida", nombre: usuario.nombre });
  } catch (error) {
    res.status(500).json({ message: "Error al validar sesión" });
  }
};

// Exportamos el objeto con los controladores.
export const { registro, login, validarSesion } = ctrl;

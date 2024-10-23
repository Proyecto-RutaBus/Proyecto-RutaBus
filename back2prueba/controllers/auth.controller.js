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
  console.log(req.body);
  
  const { email, contrasenia } = req.body;

  try {
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      console.log("Usuario no encontrado");
      
      return res
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrectos." });
    }

    // Comparar la contraseña
    const esValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!esValida) {
      console.log("Contrasenia incorrecta");
      
      return res
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrectos." });
    }

    // Acá generaramos un token JWT
    // Generar un token JWT pasando solo el ID como string
    const token = await generarJWT(usuario._id.toString());

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Funcion para modificar los datos de un usuario
ctrl.updateUser = async (req, res) => {
  const { name, birthDate, email, password } = req.body;

  try {
    // Utiliza el ID del usuario extraído desde req.usuario que proviene del token
    const usuario = await Usuario.findById(req.usuario._id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar los campos si los datos están presentes en la solicitud, o deja el valor actual
    usuario.nombre = name || usuario.nombre;
    usuario.FecNac = birthDate || usuario.FecNac; 
    usuario.email = email || usuario.email;

    // Si se proporciona la contraseña y cumple con la longitud mínima, actualiza
    if (password && password.length >= 6) {
      // encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      usuario.contrasenia = hashedPassword; // guardar la contraseña encriptada
    }

    // Guarda los cambios en la base de datos
    await usuario.save();

    // Devuelve una respuesta indicando que todo fue exitoso
    res.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error("Error actualizando el perfil:", error);
    res.status(500).json({ message: "Error actualizando el perfil" });
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

    // Enviar los datos del usuario
    res.json({
      message: "Sesion valida",
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      birthDate: usuario.FecNac,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al validar sesión" });
  }
};

// Exportamos el objeto con los controladores.
export const { registro, login, updateUser, validarSesion } = ctrl;

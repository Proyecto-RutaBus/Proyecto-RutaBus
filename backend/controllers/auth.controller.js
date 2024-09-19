import { newConnection } from "../bd/BD.js";
import bcrypt from "bcrypt";
import { generarJWT } from "../helpers/generarJWT.js";

const ctrl = {};

// Controlador para el registro de usuarios
ctrl.registro = async (req, res) => {
  try {
    const { nombre, correo, contrasenia } = req.body;
    const connection = await newConnection();
    const sql =
      "INSERT INTO USUARIOS (nombre, email, contrasenia) VALUES (?,?,?)";
    const hashContrasenia = bcrypt.hashSync(contrasenia, 10);
    await connection.query(sql, [nombre, correo, hashContrasenia]);

    // Obtener el ID del usuario recién registrado
    const [usuario] = await connection.query(
      "SELECT IdUsuario FROM USUARIOS WHERE email = ?",
      [correo]
    );
    const token = await generarJWT({ id: usuario[0].IdUsuario });

    res.json({
      msg: "Registrado correctamente",
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error en el registro", error });
  }
};

// Controlador para el inicio de sesión de usuarios
ctrl.login = async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;
    const connection = await newConnection();
    const sql = "SELECT * FROM USUARIOS WHERE EMAIL=? LIMIT 1";
    const [buscarUsuario] = await connection.query(sql, correo);

    if (!buscarUsuario[0]) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    const validarContrasenia = bcrypt.compareSync(
      contrasenia,
      buscarUsuario[0].contrasenia
    );

    if (!validarContrasenia) {
      return res
        .status(401)
        .json({ msg: "El usuario o contraseña no coinciden" });
    }

    const token = await generarJWT({ id: buscarUsuario[0].IdUsuario });

    return res.json({
      msg: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error en el inicio de sesión", error });
  }
};

export const { registro, login } = ctrl;

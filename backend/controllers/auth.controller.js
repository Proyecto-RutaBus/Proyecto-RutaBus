// Requerimos la función de conexión y otras dependencias necesarias
//const { newConnection } = require("../bd/BD.js");
import { newConnection } from "../bd/BD.js"
//const bcrypt = require("bcrypt");
import bcrypt from 'bcrypt';
//const generarJWT = require("../helpers/generarJWT");
import { generarJWT } from "../helpers/generarJWT.js"

// Definimos un objeto vacío con el nombre 'ctrl' (abreviatura de controller).
const ctrl = {};

// Empezamos a ir agregando los controladores a dicho objeto.
ctrl.registro = async (req, res) => {
  // Desestructuramos los datos que vienen del cuerpo de la petición.
  const { nombre, correo, contrasenia } = req.body;

  // Hacemos la conexión a la base de datos.
  const connection = await newConnection();

  // Creamos la consulta.
  const sql =
    "INSERT INTO USUARIOS (nombre, email, contrasenia) VALUES (?,?,?)";

  // Encriptamos la contraseña utilizando la librería bcrypt.
  const hashContrasenia = bcrypt.hashSync(contrasenia, 10); // El segundo parámetro es el número de veces que se ejecuta el algoritmo de encriptación.

  // Ejecutamos la consulta.
  await connection.query(sql, [nombre, correo, hashContrasenia]);

  // Respondemos a nuestro cliente
  res.json({
    msg: "Registrado correctamente",
  });
};

ctrl.login = async (req, res) => {
  const { correo, contrasenia } = req.body;

  const connection = await newConnection();

  // Buscamos el usuario en la bd.
  const sql = "SELECT * FROM USUARIOS WHERE EMAIL=? LIMIT 1";
  const [buscarUsuario] = await connection.query(sql, correo);

  // En caso de que no se encuentre ningún usuario, retornamos un error.
  if (!buscarUsuario[0]) {
    return res.status(400).json({
      msg: "El usuario no existe",
    });
  }

  // Comparamos las contraseñas con el método compareSync que nos devolverá un true o false.
  const validarContrasenia = bcrypt.compareSync(
    contrasenia,
    buscarUsuario[0].contrasenia
  );

  // En caso de que no coincidan, retornamos un error sin dar información específica de lo que falló.
  if (!validarContrasenia) {
    return res.status(401).json({
      msg: "El usuario o contraseña no coinciden",
    });
  }

  // Hacemos uso del helper para generar el token y le pasamos el id.
  const token = await generarJWT({ id: buscarUsuario[0].IdUsuario });

  // Retornamos el token con un mensaje al cliente.
  return res.json({
    msg: "Inicio de sesión exitoso",
    token,
  });
};

// Exportamos el objeto con los controladores.
//module.exports = ctrl;
export const { registro, login } = ctrl;

import jwt from "jsonwebtoken";
import { newConnection } from "../bd/BD.js";

const validarJWT = async (token) => {
  try {
    // Verificar el token usando el método verify.
    const { id } = jwt.verify(token, "mysecret");

    // Establecer una nueva conexión a la base de datos.
    const connection = await newConnection();

    // Buscar el usuario por ID.
    const [usuario] = await connection.query(
      "SELECT * FROM USUARIOS WHERE id=? LIMIT 1",
      [id]
    );

    // Cerrar la conexión a la base de datos.
    await connection.end();

    // Si no se encuentra el usuario, retornar false.
    if (!usuario.length) {
      return false;
    } else {
      // Si se encuentra el usuario, retornarlo.
      return usuario[0];
    }
  } catch (error) {
    // Mostrar el error por consola y retornar false.
    console.log(error);
    return false;
  }
};

export { validarJWT };

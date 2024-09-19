import { newConnection } from "../bd/BD.js";
import { validarJWT } from "../helpers/validarJWT.js"; // Asumiendo que tienes un helper para verificar el JWT

// Mostrar favoritos en base al id del usuario logeado
export const obtenerFavoritos = async (req, res) => {
  try {
    // Obtener el token de los headers
    const token = req.headers.authorization.split(" ")[1];
    const { id } = validarJWT(token); // Verificar el token y obtener el ID del usuario

    // Hacer la conexión a la base de datos
    const connection = await newConnection();

    // Crear la consulta para obtener los favoritos del usuario
    const sql = `
      SELECT P.Nombre, P.Info
      FROM ParadasFavoritas PF
      JOIN Paradas P ON PF.IdParada = P.IdParada
      WHERE PF.IdUsuario = ?
    `;

    // Ejecutar la consulta
    const [favoritos] = await connection.query(sql, [id]);

    // Cerrar la conexión
    await connection.end();

    // Responder con los favoritos
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los favoritos", error });
  }
};

// Agregar un nuevo favorito
// Agregar un nuevo favorito
export const agregarFavorito = async (req, res) => {
  try {
    // Obtener el token de los headers
    const token = req.headers.authorization.split(" ")[1];
    const { id } = validarJWT(token); // Verificar el token y obtener el ID del usuario

    const { nombre, info } = req.body;

    // Hacer la conexión a la base de datos
    const connection = await newConnection();

    // Insertar en la tabla Paradas
    const sqlParadas = `
      INSERT INTO Paradas (Nombre, Info)
      VALUES (?, ?)
    `;
    const [result] = await connection.query(sqlParadas, [nombre, info]);

    // Obtener el ID de la parada recién insertada
    const idParada = result.insertId;

    // Insertar en la tabla ParadasFavoritas
    const sqlFavoritos = `
      INSERT INTO ParadasFavoritas (IdUsuario, IdParada)
      VALUES (?, ?)
    `;
    await connection.query(sqlFavoritos, [id, idParada]);

    // Cerrar la conexión
    await connection.end();

    // Responder con un mensaje de éxito
    res.status(201).json({ msg: "Favorito agregado exitosamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al agregar el favorito", error });
  }
};

import { newConnection } from "../bd/BD.js";

// Obtener todos los reclamos
export const obtenerReclamos = async (req, res) => {
  const connection = await newConnection();
  connection.query("SELECT * FROM reclamos", (err, results) => {
    if (err) {
      console.error("Error al obtener los reclamos:", err);
      res.status(500).send("Error del servidor");
      connection.end();
    } else {
      res.json(results);
    }
  });
};

// Crear un nuevo reclamo
export const crearReclamo = async (req, res) => {
  const connection = await newConnection();
  const { descripción } = req.body;
  const usuarioId = 1;
  const consulta = connection.query(
    "INSERT INTO reclamos (descripcion) VALUES (?)",
    [descripción]
  );
  res.send(consulta);
};

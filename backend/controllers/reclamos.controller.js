import { newConnection } from "../bd/BD";

// Obtener todos los reclamos
export const obtenerReclamos = (req, res) => {
  newConnection.query("SELECT * FROM reclamos", (err, results) => {
    if (err) {
      console.error("Error al obtener los reclamos:", err);
      res.status(500).send("Error del servidor");
    } else {
      res.json(results);
    }
  });
};

// Crear un nuevo reclamo
export const crearReclamo = (req, res) => {
  const { descripcion, anonimo } = req.body;
  const usuarioId = anonimo ? null : req.body.usuarioId;
  newConnection.query(
    "INSERT INTO reclamos (descripcion, usuarioId) VALUES (?, ?)",
    [descripcion, usuarioId],
    (err, result) => {
      if (err) {
        console.error("Error al crear el reclamo:", err);
        res.status(500).send("Error del servidor");
      } else {
        res.status(201).send("Reclamo creado exitosamente");
      }
    }
  );
};

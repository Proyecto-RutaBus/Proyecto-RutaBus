import { newConnection } from "../bd/BD.js";

// Obtener todas las peticiones
export const obtenerPeticiones = (req, res) => {
  newConnection.query("SELECT * FROM peticiones", (err, results) => {
    if (err) {
      console.error("Error al obtener las peticiones:", err);
      res.status(500).send("Error del servidor");
    } else {
      res.json(results);
    }
  });
};

// Crear una nueva petición
export const crearPeticion = (req, res) => {
  const { descripcion } = req.body;

  newConnection.query(
    "INSERT INTO peticiones (descripcion) VALUES (?)",
    [descripcion],
    (err, result) => {
      if (err) {
        console.error("Error al crear la petición:", err);
        res.status(500).send("Error del servidor");
      } else {
        res.status(201).send("Petición creada exitosamente");
      }
    }
  );
};

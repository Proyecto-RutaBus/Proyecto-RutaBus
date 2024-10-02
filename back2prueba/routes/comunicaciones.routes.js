import { Router } from "express";
import Comunicacion from "../models/Comunicacion.js";
import multer from "multer";
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Cambia esto según donde quieras almacenar los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
router.post("/comunicaciones", upload.single("archivo"), async (req, res) => {
  try {
    const { tipo, descripcion, anonimo, usuarioId, nombre } = req.body;

    const nuevaComunicacion = new Comunicacion({
      tipo,
      descripcion,
      anonimo,
      archivo: req.file ? req.file.path : "",
      usuarioId: !anonimo ? usuarioId : null, // Guardar usuarioId solo si no es anónimo
      nombre: !anonimo ? nombre : null, // Guardar nombre solo si no es anónimo
    });

    await nuevaComunicacion.save();
    res.status(201).json({ message: "Solicitud guardada exitosamente." });
  } catch (error) {
    console.error("Error al guardar la solicitud:", error);
    res.status(500).json({ message: "Error al guardar la solicitud." });
  }
});

export default router;

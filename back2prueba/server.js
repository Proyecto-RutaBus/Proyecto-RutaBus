// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import connectDB from "./db.js";
import Comunicacion from "./models/Comunicacion.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Cambia esto según donde quieras almacenar los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Middleware para parsear JSON
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Servir archivos estáticos

// Endpoint para recibir reclamos y peticiones
app.post("/comunicaciones", upload.single("archivo"), async (req, res) => {
  try {
    const { tipo, descripcion, anonimo, usuarioId, nombre } = req.body;

    const nuevaComunicacion = new Comunicacion({
      tipo,
      descripcion,
      anonimo,
      archivo: req.file ? req.file.path : "",
      usuarioId: !anonimo ? usuarioId : null,
      nombre: !anonimo ? nombre : null,
    });

    await nuevaComunicacion.save();
    res.status(201).json({ message: "Solicitud guardada exitosamente." });
  } catch (error) {
    console.error("Error al guardar la solicitud:", error);
    res.status(500).json({ message: "Error al guardar la solicitud." });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

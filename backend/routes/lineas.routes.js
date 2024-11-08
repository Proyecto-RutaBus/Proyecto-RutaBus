import { Router } from "express";
import Linea from "../models/Linea.js"; // Asegúrate de incluir la extensión .js

const router = Router();

// Obtener todas las líneas
router.get("/lineas", async (req, res) => {
  try {
    const lineas = await Linea.find();
    res.json(lineas);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo líneas", error });
  }
});

// Obtener una línea específica por ID
router.get("/lineas/:id", async (req, res) => {
  try {
    const linea = await Linea.findById(req.params.id); // Busca la línea por su ID
    if (!linea) {
      return res.status(404).json({ message: "Línea no encontrada" });
    }
    res.json(linea);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo la línea", error });
  }
});

export default router;

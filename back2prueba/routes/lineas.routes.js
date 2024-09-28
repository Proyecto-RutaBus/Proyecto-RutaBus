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

export default router;

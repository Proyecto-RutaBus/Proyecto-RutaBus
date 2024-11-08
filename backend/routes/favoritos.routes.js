// routes/favoritos.routes.js
import express from "express";
import Favorite from "../models/Favoritos.js";
import { validarToken } from "../middleware/validarSesion.js";

const router = express.Router();

router.post("/favorites", validarToken, async (req, res) => {
  const { stopName, isFavorite, coordinates } = req.body;
  const userId = req.usuario._id; // Obtener el ID del usuario desde el token

  try {
    const favorite = await Favorite.findOneAndUpdate(
      { stopName, userId }, // Buscar por stopName y userId
      { isFavorite, coordinates, userId }, // Actualizar o crear con estos datos
      { new: true, upsert: true }
    );
    res.json(favorite);
  } catch (error) {
    console.error("Error saving favorite:", error);
    res.status(500).json({ error: "Error saving favorite" });
  }
});

// Nueva ruta para obtener los favoritos del usuario autenticado
router.get("/favorites", validarToken, async (req, res) => {
  const userId = req.usuario._id; // Obtener el ID del usuario desde el token

  try {
    const favorites = await Favorite.find({ userId });
    res.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Error fetching favorites" });
  }
});

export default router;

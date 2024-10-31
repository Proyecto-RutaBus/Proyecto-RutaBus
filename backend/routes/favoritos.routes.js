import express from "express";
import Favorito from "../models/Favoritos.js";

const router = express.Router();

// Ruta para obtener todos los favoritos de un usuario
router.get("/favoritos/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const favoritos = await Favorito.find({ usuarioId });
    res.status(200).json(favoritos);
  } catch (error) {
    console.error("Error al obtener los favoritos:", error);
    res.status(500).json({ message: "Error al obtener los favoritos." });
  }
});

// Ruta para agregar un nuevo favorito
router.post("/favoritos", async (req, res) => {
  const { nombreParada, nombreFavorito, usuarioId, paradaId } = req.body; // Asegúrate de que el body contenga estos campos

  try {
    const nuevoFavorito = new Favorito({
      nombreParada,
      nombreFavorito,
      usuarioId,
      paradaId, // Agregamos paradaId si estás almacenando una referencia a la parada
    });

    await nuevoFavorito.save();
    res.status(201).json({ message: "Favorito guardado exitosamente." });
  } catch (error) {
    console.error("Error al guardar el favorito:", error);
    res.status(500).json({ message: "Error al guardar el favorito." });
  }
});

// Ruta para eliminar un favorito
router.delete("/favoritos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Favorito.findByIdAndDelete(id);
    res.status(200).json({ message: "Favorito eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar el favorito:", error);
    res.status(500).json({ message: "Error al eliminar el favorito." });
  }
});

export default router;

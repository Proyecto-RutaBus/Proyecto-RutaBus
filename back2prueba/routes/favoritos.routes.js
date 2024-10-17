import express from "express";
import Favorite from "../models/Favoritos.js";

const router = express.Router();

router.post("/favorites", async (req, res) => {
  const { stopName, isFavorite, coordinates } = req.body;
  try {
    const favorite = await Favorite.findOneAndUpdate(
      { stopName },
      { isFavorite, coordinates },
      { new: true, upsert: true }
    );
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Error saving favorite" });
  }
});

export default router;

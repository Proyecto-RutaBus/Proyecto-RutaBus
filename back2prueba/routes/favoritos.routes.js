// routes/favoritos.routes.js
import express from "express";
import Favorite from "../models/Favoritos.js";

const router = express.Router();

router.post("/favorites", async (req, res) => {
  const { stopName, isFavorite, coordinates } = req.body;
  console.log("Request Body:", req.body); // Agrega este log
  try {
    const favorite = await Favorite.findOneAndUpdate(
      { stopName },
      { isFavorite, coordinates },
      { new: true, upsert: true }
    );
    console.log("Saved Favorite:", favorite); // Agrega este log
    res.json(favorite);
  } catch (error) {
    console.error("Error saving favorite:", error); // Agrega este log
    res.status(500).json({ error: "Error saving favorite" });
  }
});

export default router;
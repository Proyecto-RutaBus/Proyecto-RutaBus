// models/Favorite.js
import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  stopName: { type: String, required: true },
  isFavorite: { type: Boolean, required: true },
  coordinates: {
    type: [Number], // Cambiar a array de números
    required: true,
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;

// models/Favorite.js
import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  stopName: { type: String, required: true },
  isFavorite: { type: Boolean, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;

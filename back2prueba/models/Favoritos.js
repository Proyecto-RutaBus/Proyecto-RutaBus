import mongoose from "mongoose";

const favoritoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario", // Referencia al modelo de usuarios
    required: true,
  },
  paradaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parada", // Referencia al modelo de paradas
    required: true,
  },
  nombreParada: {
    type: String,
    required: true,
  },
  nombreFavorito: {
    type: String, // El nombre personalizado que puede darle el usuario
    default: null,
  },
  creadoEn: {
    type: Date,
    default: Date.now,
  },
});

const Favorito = mongoose.model("Favorito", favoritoSchema);

export default Favorito;

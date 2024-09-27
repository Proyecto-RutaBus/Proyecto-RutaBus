// models/Comunicacion.js
import mongoose from "mongoose";

const comunicacionSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    enum: ["reclamo", "peticion"],
  },
  descripcion: {
    type: String,
    required: true,
  },
  anonimo: {
    type: Boolean,
    required: true,
  },
  archivo: {
    type: String,
    default: "",
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  usuarioId: {
    type: String,
    default: null,
  },
  nombre: {
    type: String,
    default: null,
  },
});

export default mongoose.model("Comunicacion", comunicacionSchema);

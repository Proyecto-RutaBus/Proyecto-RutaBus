import mongoose from "mongoose";

const paradaSchema = new mongoose.Schema({
  nombre: String,
  coordenadas: [Number],
  info: String,
});

const recorridoSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
});

const lineaSchema = new mongoose.Schema({
  nombre: String,
  paradas: [paradaSchema],
  recorrido: [recorridoSchema],
});

const Linea = mongoose.model("Linea", lineaSchema);

export default Linea;

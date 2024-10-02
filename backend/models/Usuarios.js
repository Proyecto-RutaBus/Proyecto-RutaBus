import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contrasenia: {  
    type: String,
    required: true,
  },
  FecNac: { // Fecha de nacimiento
    type: Date,
    required: true,
  },
}, { timestamps: true }); // Añade timestamps para fechas de creación y actualización

const Usuario = mongoose.model('Usuario', usuarioSchema, 'Usuarios');

export default Usuario;

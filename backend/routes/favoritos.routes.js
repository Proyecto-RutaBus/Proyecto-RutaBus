import express from "express";
import {
  obtenerFavoritos,
  agregarFavorito,
} from "../controllers/favoritos.controller.js";

const routerFavoritos = express.Router();

// Ruta para obtener los favoritos del usuario logueado
routerFavoritos.get("/favoritos", obtenerFavoritos);

// Ruta para agregar un nuevo favorito
routerFavoritos.post("/favoritos", agregarFavorito);

export default routerFavoritos;

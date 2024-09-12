import { Router } from "express";

import {
  crearPeticion,
  obtenerPeticiones,
} from "../controllers/peticiones.controller.js";

const routerPeticiones = Router();

routerPeticiones.post("/peticion", crearPeticion);
routerPeticiones.get("/peticion", obtenerPeticiones);

export { routerPeticiones };

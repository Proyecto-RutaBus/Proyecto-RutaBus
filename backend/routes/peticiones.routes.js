import { Router } from "express";

import {
  crearPeticion,
  obtenerPeticiones,
} from "../controllers/peticiones.controller";

const routerPeticiones = Router();

routerPeticiones.post("/peticiones", crearPeticion);
routerPeticiones.get("/peticiones", obtenerPeticiones);

export { routerPeticiones };

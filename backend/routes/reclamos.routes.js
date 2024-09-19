import { Router } from "express";
import {
  crearReclamo,
  obtenerReclamos,
} from "../controllers/reclamos.controller.js";

const routerReclamos = Router();

routerReclamos.post("/reclamo", crearReclamo);
routerReclamos.get("/reclamo", obtenerReclamos);

export { routerReclamos };

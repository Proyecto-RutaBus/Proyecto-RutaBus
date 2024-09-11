import { Router } from "express";
import {
  crearReclamo,
  obtenerReclamos,
} from "../controllers/reclamos.controller";

const routerReclamos = Router();

routerReclamos.post("/reclamos", crearReclamo);
routerReclamos.get("/reclamos", obtenerReclamos);

export { routerReclamos };

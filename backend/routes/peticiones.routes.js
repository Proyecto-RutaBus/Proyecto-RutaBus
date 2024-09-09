import { Router } from "express";

const routerPeticiones = Router();

routerPeticiones.post("/peticiones");
routerPeticiones.get("/peticiones");

export { routerPeticiones };

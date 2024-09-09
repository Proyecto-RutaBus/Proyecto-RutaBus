import { Router } from "express";

const routerReclamos = Router();

routerReclamos.post("/reclamos");
routerReclamos.get("/reclamos");

export { routerReclamos };

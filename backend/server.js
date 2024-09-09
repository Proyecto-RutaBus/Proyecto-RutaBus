// Requerimos las dependencias.
// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Obtener el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializamos express
const app = express();

//Aplicamos los middlewares.
app.use(cors()); // cors para que nos permita realizar peticiones desde cualquier cliente.
app.use(morgan("dev")); // morgan para mostrar informacion acerca de las peticiones que llegan a nuestro servidor.
app.use(express.json()); // express.json para que nuestro servidor pueda reconocer los json que recibimos por el body.

//Requerimos nuestras rutas.
//app.use(require("./routes/auth.routes"));
import router from "./routes/auth.routes.js"
app.use(router);

// Servir archivos estáticos desde la carpeta client
app.use(express.static(path.join(__dirname, "../client")));

// Ruta para servir el archivo index.html
app.get("/", (req, res) => {
  res.sendFile(patch.join(__dirname, "../client", "index.html"));
});


app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000 http://localhost:3000");
});

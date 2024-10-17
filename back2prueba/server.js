// server.js
import express from "express";
import cors from "cors";
import connectDB from "./db/database.js";
import comunicacionesRoutes from "./routes/comunicaciones.routes.js";
import lineasRoutes from "./routes/lineas.routes.js";
import favoritosRoutes from "./routes/favoritos.routes.js";
import path from "path";
import morgan from "morgan";

import { fileURLToPath } from "url";

// Obtener el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Servir archivos estáticos

import router from "./routes/auth.routes.js";
app.use(router);
app.use("/api", comunicacionesRoutes);
app.use("/api", lineasRoutes);
app.use("/api", favoritosRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

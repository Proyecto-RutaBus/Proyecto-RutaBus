// server.js
import express from "express";
import cors from "cors";
import connectDB from "./db/database.js";
import comunicacionesRoutes from "./routes/comunicaciones.routes.js";
import lineasRoutes from "./routes/lineas.routes.js";
import favoritosRoutes from "./routes/favoritos.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Servir archivos estáticos

import router from "./routes/auth.routes.js";
import routerForum from "./routes/forum.routes.js";
app.use(router);
app.use("/api", comunicacionesRoutes);
app.use("/api", lineasRoutes);
app.use("/api", favoritosRoutes);
app.use("/forums", routerForum);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

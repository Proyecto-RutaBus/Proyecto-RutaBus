// server.js
import express from "express";
import cors from "cors";
import connectDB from "./db/database.js";
import comunicacionesRoutes from "./routes/comunicaciones.routes.js";
import lineasRoutes from "./routes/lineas.routes.js";
import favoritosRoutes from "./routes/favoritos.routes.js";
import http from 'http'
import { Server } from 'socket.io'


const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app); // crea el servidor
const io = new Server(server, { cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] } }); // configura Socket.io

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Servir archivos estáticos
app.use((req, res, next)=>{
  req.io = io;
  next();
}); // Pasar la variable 'io' a la solicitud

import router from "./routes/auth.routes.js";
import routerForum from "./routes/forum.routes.js";
app.use(router);
app.use("/api", comunicacionesRoutes);
app.use("/api", lineasRoutes);
app.use("/api", favoritosRoutes);
app.use("/forums", routerForum);



// Manejo de la conexión de socket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  
  // Emitir el evento cuando se crea un nuevo comentario
  socket.on('newComment', (post) => {
    io.emit('newComment', post); // Enviar el post a todos los clientes conectados
  });
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

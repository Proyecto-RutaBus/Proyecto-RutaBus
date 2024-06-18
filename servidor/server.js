const express = require("express");
const app = express();

const { newConnection } = require("./BD");

app.use(express.json());

// Obtener todos los usuarios
app.get("/", async (request, response) => {
    const connection = await newConnection();
    const [results] = await connection.query("SELECT * FROM usuarios");
    response.json(results);
    connection.end();
});

// Obtener un usuario por ID
app.get("/usuarios/:IdUsuario", async (request, response) => {
    const connection = await newConnection();
    const id = request.params.IdUsuario;
    const [results] = await connection.query("SELECT * FROM usuarios WHERE IdUsuario = ?", [id]);
    response.json(results[0]);
    connection.end();
});

// Crear un nuevo usuario
app.post("/usuarios", async (request, response) => {
    const connection = await newConnection();
    const { nombre, email, contrasenia, FecNac } = request.body;

    if (!nombre || !email || !contrasenia || !FecNac) {
        return response.status(400).send('Faltan datos.');
    }

    await connection.query("INSERT INTO usuarios (nombre, email, contrasenia, FecNac) VALUES (?, ?, ?, ?)", [nombre, email, contrasenia, FecNac]);
    response.send("Usuario creado correctamente");
    connection.end();
});

/*
// Eliminar un usuario por su ID
app.delete("/usuarios/:IdUsuario", async (request, response) => {
    const connection = await newConnection();
    const id = request.params.IdUsuario;
    const results = await connection.query("DELETE FROM usuarios WHERE IdUsuario = ?", [id]);
    response.json(results[0]);
    connection.end();
});
*/

app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});
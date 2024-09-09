// Requerimos las dependencias.
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//IMPORT
import { routerPeticiones } from "./routes/peticiones.routes.js";
import { routerReclamos } from "./routes/reclamos.routes.js";

// Inicializamos express
const app = express();

//Aplicamos los middlewares.
app.use(cors()); // cors para que nos permita realizar peticiones desde cualquier cliente.
app.use(morgan("dev")); // morgan para mostrar informacion acerca de las peticiones que llegan a nuestro servidor.
app.use(express.json()); // express.json para que nuestro servidor pueda reconocer los json que recibimos por el body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Requerimos nuestras rutas.
app.use(require("./routes/auth.routes"));

const { newConnection } = require("./bd/BD");

app.use("/comunicaciones", routerPeticiones);
app.use("/comunicaciones", routerReclamos);
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
  const [results] = await connection.query(
    "SELECT * FROM usuarios WHERE IdUsuario = ?",
    [id]
  );
  response.json(results[0]);
  connection.end();
});

/* / Crear un nuevo usuario
app.post("/usuarios", async (request, response) => {
    const connection = await newConnection();
    const { nombre, email, contrasenia, FecNac } = request.body;

    if (!nombre || !email || !contrasenia || !FecNac) {
        return response.status(400).send('Faltan datos.');
    }

    await connection.query("INSERT INTO usuarios (nombre, email, contrasenia, FecNac) VALUES (?, ?, ?, ?)", [nombre, email, contrasenia, FecNac]);
    response.send("Usuario creado correctamente");
    connection.end();
}); */

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000 http://localhost:3000");
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/registro', (req, res) => {
    const { nombre, apellido, email, contraseña } = req.body;

    // Acá añadir la lógica para guardar estos datos en una base de datos

    res.send(`Usuario ${nombre} ${apellido} registrado con éxito`);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

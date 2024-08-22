const { newConnection } = require('../bd/BD');
const lineas = require('../client/assets/js/main.js');

const ctrl = {};

ctrl.postFavorite = async (req, res) => {
    const { nroLinea, nombreParada } = req.body;

    // Buscar la línea y la parada correspondiente
    const linea = lineas.find(l => l.nombre === nroLinea);
    if (!linea) {
        return res.status(400).send('Línea no válida');
    }

    const parada = linea.paradas.find(p => p.nombre === nombreParada);
    if (!parada) {
        return res.status(400).send('Parada no válida');
    }

    const Linea = linea.nombre;
    const calles = parada.info;

    try {
        // Conectar a la base de datos
        const connection = await newConnection();

        // Insertar el favorito en la base de datos
        const query = 'INSERT INTO favoritos (Linea, calles) VALUES (?, ?)';
        await connection.execute(query, [Linea, calles]);

        // Cerrar la conexión
        await connection.end();

        // Enviar una respuesta al cliente
        res.status(201).send({ message: 'Favorito añadido exitosamente' });
    } catch (error) {
        console.error('Error insertando favorito:', error);
        res.status(500).send('Error insertando favorito');
    }
};

module.exports = ctrl;
// Requerimos mysql
const mysql = require("mysql2/promise")

// Creamos una función para realizar la conexión a la bd

const newConnection = async ()=> {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bd-proyecto-rutabus' // nombre de nuestra bd
    })
}

// Exportamos la funcion para realizar la conexion desde cualquier archivo.
module.exports = {
    newConnection
}

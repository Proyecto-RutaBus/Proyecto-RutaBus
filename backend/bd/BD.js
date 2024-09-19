// Requerimos mysql
import mysql from "mysql2/promise";

// Función para crear la base de datos si no existe
const createDatabaseIfNotExists = async () => {
  // Conexión inicial sin especificar base de datos
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });

  // Crear base de datos si no existe
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`bd-proyecto-rutabus\``
  );
  await connection.end(); // Cerramos la conexión
};

// Creamos una función para realizar la conexión a la bd
const newConnection = async () => {
  // Llamamos a la función que crea la base de datos si no existe
  await createDatabaseIfNotExists();

  // Conexión a la base de datos especificada
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bd-proyecto-rutabus", // nombre de nuestra bd
  });

  // Crear la tabla USUARIOS si no existe
  await connection.query(`CREATE TABLE IF NOT EXISTS USUARIOS (
        IdUsuario INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        contrasenia VARCHAR(255) NOT NULL
    )`);

  // Crear la tabla Paradas si no existe
  await connection.query(`CREATE TABLE IF NOT EXISTS Paradas (
  IdParada INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(100),
  Info TEXT
)`);

  // Crear la tabla ParadasFavoritas si no existe
  await connection.query(`CREATE TABLE IF NOT EXISTS ParadasFavoritas (
  IdUsuario INT,
  IdParada INT,
  PRIMARY KEY (IdUsuario, IdParada),
  FOREIGN KEY (IdUsuario) REFERENCES USUARIOS(IdUsuario),
  FOREIGN KEY (IdParada) REFERENCES Paradas(IdParada)
)`);

  return connection; // Retornamos la conexión
};

// Exportamos la función para realizar la conexión desde cualquier archivo.
export { newConnection };

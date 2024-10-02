import jwt from "jsonwebtoken";

const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    // Si id es un objeto, conviértelo a string antes de firmar el token
    const userId = id.toString();

    jwt.sign(
      { id: userId },  // Pasar el id como un string
      process.env.JWT_SECRET || "mysecret",
      {
        expiresIn: 60 * 60,  // Expira en 1 hora
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generarJWT };

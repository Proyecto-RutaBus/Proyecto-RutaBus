import jwt from "jsonwebtoken";

export const verificarAutenticacion = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado" });
    }

    try {
        const decoded = jwt.verify(token, "mysecret");
        req.usuarioId = decoded.id; // Guardamos el ID del usuario en la solicitud
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

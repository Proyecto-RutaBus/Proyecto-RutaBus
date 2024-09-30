// Reemplaza la URL base por la de tu backend
const API_URL = "http://localhost:3000";

export const loginUser = async (email, contrasenia) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, contrasenia }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "Error al iniciar sesión");
    }

    // Almacenar el token en el localStorage
    localStorage.setItem("token", data.token);

    // Redirigir al usuario a la página principan
    window.location.href = "/";
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (nombre, email, contrasenia, FecNac) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, contrasenia, FecNac }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "Error al registrar usuario");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

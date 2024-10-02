import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loginUser, registerUser } from "../../services/auth.js";
import { AuthContext } from "../../context/AuthContext";

export const Login = function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [nombre, setNombre] = useState("");
  const [FecNac, setFecNac] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setContrasenia("");
    setNombre("");
    setFecNac("");
    setError("");
  };
  const { iniciarSesion } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Lógica para iniciar sesión
        const data = await loginUser(email, contrasenia);
        console.log("Inicio de sesión exitoso", data);

        iniciarSesion(data.token);
      } else {
        // Lógica para registrar usuario
        const data = await registerUser(nombre, email, contrasenia, FecNac);
        console.log("Registro exitoso", data);
        // Después de registrar, puedes cambiar al formulario de login o iniciar sesión automáticamente
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  // Ocultar el boton de ingresar cuando esté en login
  useEffect(() => {
    // Seleccionar el botón por su ID y ocultarlo
    const button = document.getElementById("botonIngresar");
    if (button) {
      button.style.display = "none"; // Ocultar el botón
    }

    // Restablecer el estado cuando se desmonta el componente
    return () => {
      if (button) {
        button.style.display = "block"; // Mostrar el botón nuevamente
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[#63997a] to-[#fa7f4b] p-6">
              <h2 className="text-3xl font-extrabold text-white text-center">
                {isLogin ? "Bienvenido a RutaBus" : "Únete a nosotros"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              {!isLogin && (
                <>
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-[#63997a] focus:ring-1 focus:ring-[#63997a]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="FecNac"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      id="FecNac"
                      name="FecNac"
                      value={FecNac}
                      onChange={(e) => setFecNac(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-[#63997a] focus:ring-1 focus:ring-[#63997a]"
                      required
                    />
                  </div>
                </>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-[#63997a] focus:ring-1 focus:ring-[#63997a]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contrasenia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="contrasenia"
                  name="contrasenia"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-[#63997a] focus:ring-1 focus:ring-[#63997a]"
                  required
                />
              </div>
              <div>
                <button
                  id="botonPrueba"
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#63997a] to-[#fa7f4b] hover:from-[#568469] hover:to-[#e57243] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#63997a]"
                >
                  {isLogin ? "Iniciar Sesión" : "Registrarse"}
                </button>
              </div>
            </form>
            <div className="px-8 pb-8">
              <button
                onClick={toggleForm}
                className="w-full text-center text-sm text-[#63997a] hover:text-[#fa7f4b] transition-colors duration-300"
              >
                {isLogin
                  ? "¿No tienes cuenta? Regístrate"
                  : "¿Ya tienes cuenta? Inicia sesión"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

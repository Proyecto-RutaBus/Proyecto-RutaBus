import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"; 
import "../style.css";
// Login provicional, después lo hago lindo
export const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para manejar el formulario activo

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío de formularios según el estado
    alert(isLogin ? "Iniciar sesión" : "Registro");
  };

  return (
    <div>
      <Header />
      <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <label htmlFor="nombre" className="block text-gray-700">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </>
          )}
          <label htmlFor="email" className="block text-gray-700">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <label htmlFor="password" className="block text-gray-700">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>
        <button
          onClick={toggleForm}
          className="mt-4 text-blue-500 hover:underline"
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </main>
      <Footer />
    </div>
  );
};

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Login = function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío de formularios según el estado
    console.log(isLogin ? "Iniciar sesión" : "Registro", {
      email,
      password,
      name,
    });
  };
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
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                      focus:outline-none focus:border-[#63997a] focus:ring-1 focus:ring-[#63997a]"
                    required
                  />
                </div>
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
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-[#63997a] focus:ring-1 focus:ring-[#63997a]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
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

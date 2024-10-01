import React, { useState, useEffect } from "react";

const Header = () => {
  // Estado para manejar si el usuario está logueado y el nombre de usuario
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar el menú del usuario

  // Efecto para comprobar si hay un token en localStorage cuando el componente se monta
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);

      // Simular obtener el nombre del usuario con una petición al backend
      const getUserData = async () => {
        try {
          const response = await fetch("/validarSesion", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Enviar el token
            },
          });

          const data = await response.json();
          if (response.ok) {
            setUserName(data.nombre); // Acceder al campo nombre
          } else {
            console.error("Error en la validación de sesión:", data.message);
          }
        } catch (error) {
          console.error("Error obteniendo datos del usuario:", error);
        }
      };

      getUserData();
    }
  }, []);

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token"); // Eliminar el token para cerrar sesión
    setIsLoggedIn(false); // Cambiar el estado a no logueado
    window.location.href = "/login"; // Redirigir al login
  };

  // Función para alternar el menú del usuario
  const toggleUserMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#63997a] w-full z-50">
      <nav className="flex justify-between items-center p-4">
        <div>
          <img
            src="/assets/img/Logo-nav.png"
            className="h-[100px] mt-1"
            alt="Logo"
          />
        </div>
        <div className="flex gap-8 ml-2 mr-12">
          {!isLoggedIn ? (
            <a href="/login">
              <button className="bg-[#fa7f4b] h-[50px] w-[150px] rounded-md hover:bg-[#ffdf61] transition-colors duration-300">
                <span className="text-white text-lg">Ingresar</span>
              </button>
            </a>
          ) : (
            <div className="relative">
              <img
                src="/assets/img/avatar.png"
                alt="Usuario"
                className="cursor-pointer"
                onClick={toggleUserMenu} // Función para mostrar el menú
              />
              <span className="ml-2 text-white">{userName}</span>
              {isMenuOpen && (
                <div className="absolute z-50 top-14 right-0 bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden">
                  <a
                    href="/ver-perfil"
                    className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors duration-300"
                  >
                    Ver Perfil
                  </a>
                  <a
                    href="/editar-perfil"
                    className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors duration-300"
                  >
                    Editar Perfil
                  </a>
                  <a
                    href="/reclamos-peticiones"
                    className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors duration-300"
                  >
                    Reclamos/Peticiones
                  </a>
                  <a
                    href="/favoritos"
                    className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors duration-300"
                  >
                    Favoritos
                  </a>
                  <a
                    href="https://tarjetasube.sube.gob.ar/subeweb/webforms/account/views/login.aspx"
                    className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors duration-300"
                  >
                    Ver mi SUBE
                  </a>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-200 transition-colors duration-300"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

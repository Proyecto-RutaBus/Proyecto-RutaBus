import React, { useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Cambiado a true para mostrar el estado logueado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    // Implementar lógica de cierre de sesión aquí
    setIsLoggedIn(false);
    setIsMenuOpen(false);
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
            <a href="/Login">
              <button className="bg-[#fa7f4b] h-[50px] w-[150px] rounded-md hover:bg-[#ffdf61] transition-colors duration-300">
                <span className="text-white text-lg">Registrarse</span>
              </button>
            </a>
          ) : (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="w-12 h-12 rounded-full bg-[#fa7f4b] flex items-center justify-center text-white text-2xl font-bold hover:bg-[#ffdf61] transition-colors duration-300"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
              >
                U
              </button>
              {isMenuOpen && (
                <div className="absolute top-14 right-0 bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden">
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

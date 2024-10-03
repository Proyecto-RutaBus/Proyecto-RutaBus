import React, { useState, useEffect } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const getUserData = async () => {
        try {
          const response = await fetch("http://localhost:3000/validarSesion", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();

          if (response.ok) {
            setUserName(data.nombre);
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

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const toggleUserMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-[#63997a] w-full z-50">
      <nav className="flex justify-between items-center p-4">
        <div>
          <a href="/home">
            <img
              src="/assets/img/Logo-nav.png"
              className="h-[100px] mt-1"
              alt="Logo"
            />
          </a>
        </div>
        <div className="flex gap-8 ml-2 mr-12">
          {!isLoggedIn ? (
            <a href="/login">
              <button
                id="botonIngresar"
                className="bg-[#fa7f4b] h-[50px] w-[150px] rounded-md hover:bg-[rgb(255,151,14)] transition-colors duration-300"
              >
                <span className="text-white text-lg">Ingresar</span>
              </button>
            </a>
          ) : (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 text-black hover:text-white transition-colors duration-300 bg-gray-100 hover:bg-gray-800 py-2 px-4 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-semibold">{userName}</span>
              </button>
              {isMenuOpen && (
                <div className="absolute z-50 top-14 right-0 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden w-72">
                  <div className="py-4 px-6 bg-gray-50 border-b border-gray-200">
                    <p className="text-base text-gray-500">Hola,</p>
                    <p className="text-xl font-semibold text-gray-800">
                      {userName}
                    </p>
                  </div>
                  <div className="py-3">
                    <MenuItem
                      href="/profile"
                      iconPath="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      text="Ver Perfil"
                    />
                    <MenuItem
                      href="/editar-perfil"
                      iconPath="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                      text="Editar Perfil"
                    />
                    <MenuItem
                      href="/reclamos"
                      iconPath="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      text="Reclamos/Peticiones"
                    />
                    <MenuItem
                      href="https://tarjetasube.sube.gob.ar/subeweb/webforms/account/views/login.aspx"
                      iconPath="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      text="Ver mi SUBE"
                    />
                    <hr className="my-3 border-gray-200" />
                    <button
                      onClick={logout}
                      className="w-full text-left px-6 py-3 text-base text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-3 text-black"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

const MenuItem = ({ href, iconPath, text }) => (
  <a
    href={href}
    className=" px-6 py-3 text-base text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 mr-3 text-black"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path fillRule="evenodd" d={iconPath} clipRule="evenodd" />
    </svg>
    {text}
  </a>
);

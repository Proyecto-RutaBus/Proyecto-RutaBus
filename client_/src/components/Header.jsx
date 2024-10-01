import React, { useState, useEffect } from 'react';

const Header = () => {
  // Estado para manejar si el usuario está logueado y el nombre de usuario
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Efecto para comprobar si hay un token en localStorage cuando el componente se monta
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoggedIn(true);

      // Simular obtener el nombre del usuario con una petición al backend
      // Puedes sustituir esto con la lógica real para obtener los datos del usuario
      const getUserData = async () => {
        try {
          const token = localStorage.getItem('token');  // Obtener el token
          const response = await fetch('/validarSesion', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,  // Enviar el token
            },
          });
      
          const data = await response.json();
          if (response.ok) {
            setUserName(data.nombre);  // Acceder al campo nombre
            console.log('Datos del usuario:', data);
          } else {
            console.error('Error en la validación de sesión:', data.message);
          }
        } catch (error) {
          console.error('Error obteniendo datos del usuario:', error);
        }
      };
      

      getUserData();
    }
  }, []);

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
          {!isLoggedIn && (
            <button id="loginBtn" className="bg-[#fa7f4b] h-[50px] w-[150px] rounded-md hover:bg-[#ffdf61]">
              <a href="/login" className="text-white text-lg">Ingresar</a>
            </button>
          )}
          {isLoggedIn && (
            <div id="userIcon" className="relative">
              <img src="/assets/img/avatar.png" alt="Usuario" className="cursor-pointer" onClick={() => {/* toggleUserMenu() */}} />
              <span className="ml-2 text-white">{userName}</span>
              <div id="userMenu" className="absolute top-[90px] right-0 bg-white border border-gray-300 shadow-lg hidden">
                <a href="./Ver_Perfil.html" className="block px-3 py-2 text-black hover:bg-gray-200">Ver Perfil</a>
                <a href="./Editar_Perfil.html" className="block px-3 py-2 text-black hover:bg-gray-200">Editar Perfil</a>
                <a href="./reclamos_peticiones.html" className="block px-3 py-2 text-black hover:bg-gray-200">Reclamos/Peticiones</a>
                <a href="./favoritos.html" className="block px-3 py-2 text-black hover:bg-gray-200">Favoritos</a>
                <a href="#" className="block px-3 py-2 text-black hover:bg-gray-200" onClick={() => {
                  localStorage.removeItem('token');  // Eliminar el token para cerrar sesión
                  setIsLoggedIn(false);  // Cambiar el estado a no logueado
                  window.location.href = '/login';  // Redirigir al login
                }}>Cerrar Sesión</a>
              </div>
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

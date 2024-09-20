import React, { useState } from 'react';

const Header = () => {
  // Estado para manejar si el usuario está logueado o no
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-[#63997a] w-full z-50">
      <nav className="flex justify-between items-center p-4">
        <div>
          <img src="/assets/img/Logo-nav.png" className="h-[100px] mt-1" alt="Logo" />
        </div>
        <div className="flex gap-8 ml-2 mr-12">
          {!isLoggedIn && (
            <>
              <button id="loginBtn" className="bg-[#fa7f4b] h-[50px] w-[150px] rounded-md hover:bg-[#ffdf61]">
                <a href="/login" className="text-white text-lg">Ingresar</a>
              </button>
            </>
          )}
          {isLoggedIn && (
            <div id="userIcon" className="relative">
              <img src="/assets/img/avatar.png" alt="Usuario" className="cursor-pointer" onClick={() => {/* toggleUserMenu() */}} />
              <div id="userMenu" className="absolute top-[90px] right-0 bg-white border border-gray-300 shadow-lg">
                <a href="./Ver_Perfil.html" className="block px-3 py-2 text-black hover:bg-gray-200">Ver Perfil</a>
                <a href="./Editar_Perfil.html" className="block px-3 py-2 text-black hover:bg-gray-200">Editar Perfil</a>
                <a href="./reclamos_peticiones.html" className="block px-3 py-2 text-black hover:bg-gray-200">Reclamos/Peticiones</a>
                <a href="./favoritos.html" className="block px-3 py-2 text-black hover:bg-gray-200">Favoritos</a>
                <a href="https://tarjetasube.sube.gob.ar/subeweb/webforms/account/views/login.aspx" className="block px-3 py-2 text-black hover:bg-gray-200">Ver mi SUBE</a>
                <a href="#" className="block px-3 py-2 text-black hover:bg-gray-200" onClick={() => {/* logout() */}}>Cerrar Sesión</a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

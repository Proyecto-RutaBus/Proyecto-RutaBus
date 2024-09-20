import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#63997a] p-10 text-white">
      <div className="flex justify-between">
        <div className="w-1/3">
          <img src="/assets/img/Logo-nav.png" alt="Logo" className="mb-4" />
          <p className="footer-links">
            <a href="/" className="link-1 text-black">Home</a>
            <a href="/about" className="mx-4 text-black">About</a>
            <a href="/contact" className='text-black'>Contact</a>
          </p>
          <p className="footer-company-name">RutaBus ©2024</p>
        </div>

        <div className="w-1/3">
          <div className="flex items-center mb-2">
            <i className="fa fa-map-marker mr-2"></i>
            <p><span>Polo Cientifico</span> Ruta 81, km 2134</p>
          </div>
          <div className="flex items-center mb-2">
            <i className="fa fa-phone mr-2"></i>
            <p>+54-3704-122334</p>
          </div>
          <div className="flex items-center">
            <i className="fa fa-envelope mr-2"></i>
            <p>
              <a href="mailto:support@company.com" className="text-lightseagreen text-black">support@RutaBus.com</a>
            </p>
          </div>
        </div>

        <div className="w-1/3">
          <p className="footer-company-about">
            <span>Sobre RutaBus</span><br />
            En RutaBus, estamos dedicados a transformar la experiencia del transporte público. Nuestro objetivo es proporcionar a los usuarios una plataforma fácil de usar para explorar rutas de autobús, hacer seguimiento en tiempo real y gestionar sus trayectos de manera eficiente.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

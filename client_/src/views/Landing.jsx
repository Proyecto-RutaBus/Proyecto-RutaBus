import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-grow">
        <section className="text-center py-20 bg-gray-100">
          <h1 className="text-5xl font-bold mb-8 text-green-700">
            Bienvenidos a RutaBus
          </h1>
          <p className="text-xl text-gray-700">
            Explorá las rutas de autobús de manera eficiente y fácil.
          </p>
        </section>

        {/* Puedes agregar más secciones aquí */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-8">
              ¿Cómo funciona RutaBus?
            </h2>
            <p className="text-center text-lg text-gray-600">
              Te ayudamos a gestionar tus trayectos y a explorar las rutas en tiempo real. ¡Empezá hoy mismo!
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;

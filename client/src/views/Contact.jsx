'use client'

import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Send, Mail, Phone, MapPin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    alert(`Gracias por contactarnos, ${data.nombre}. Hemos recibido tu mensaje.`);
    reset();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 p-6 text-gray-800">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-blue-600">Contacto</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            ¿Tienes alguna pregunta o comentario? Nos encantaría saber de ti.
            Completa el formulario a continuación y nos pondremos en contacto
            contigo lo antes posible.
          </p>
        </motion.section>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <label htmlFor="nombre" className="block text-lg font-medium mb-2 text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  {...register("nombre", { required: "Este campo es requerido" })}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Tu nombre"
                />
                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { 
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Dirección de email inválida"
                    }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="mensaje" className="block text-lg font-medium mb-2 text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  {...register("mensaje", { required: "Este campo es requerido" })}
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
                {errors.mensaje && <p className="text-red-500 text-sm mt-1">{errors.mensaje.message}</p>}
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center text-lg font-semibold"
              >
                <Send className="mr-2" size={20} />
                Enviar Mensaje
              </motion.button>
            </form>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">Información de Contacto</h2>
            <div className="space-y-6">
              <p className="flex items-center text-lg text-gray-700">
                <Mail className="mr-3 text-blue-600" size={24} />
                <a href="mailto:contacto@rutabus.com" className="hover:text-blue-600 transition duration-300">contacto@rutabus.com</a>
              </p>
              <p className="flex items-center text-lg text-gray-700">
                <Phone className="mr-3 text-blue-600" size={24} />
                <a href="tel:+123456789" className="hover:text-blue-600 transition duration-300">+123 456 7890</a>
              </p>
              <p className="flex items-center text-lg text-gray-700">
                <MapPin className="mr-3 text-blue-600" size={24} />
                Polo Científico, Ciudad Formosa, Argentina
              </p>
            </div>
            <div className="mt-8 h-64 rounded-lg overflow-hidden shadow-md">
              <MapContainer center={[-26.1867, -58.1756]} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[-26.1867, -58.1756]}>
                  <Popup>
                    RutaBus - Polo Científico, Ciudad Formosa
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
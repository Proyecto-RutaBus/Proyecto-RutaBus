import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { Clock, MapPin, MessageSquare, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="overflow-hidden font-sans">
      <Header />
      <main className="flex-grow">
        <section className="relative py-20 text-center bg-[#63997a] text-white overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 relative z-10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight"
                >
                  <span className="block text-3xl md:text-4xl font-normal mb-2">
                    ¿Cansado de esperar?
                  </span>
                  RutaBus te libera
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl md:text-2xl mb-8 max-w-xl mx-auto font-light"
                >
                  Viaja sin estrés en Formosa.
                  <span className="block font-semibold mt-2">
                    Tu tiempo es valioso.
                  </span>
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#fa7f4b] text-white text-lg font-bold rounded-full hover:bg-[#fa7f4b]/90 transition-colors shadow-lg uppercase tracking-wide"
                >
                  Descubre cómo
                </motion.button>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="md:w-1/2"
              >
                <img
                  src="/assets/img/Bus-stop.jpg"
                  alt="Personas esperando el colectivo"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </motion.div>
            </div>
          </motion.div>
          <div className="absolute inset-0 bg-[#63997a]/20 backdrop-blur-sm"></div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </motion.div>
        </section>

        <section id="problemas" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-center mb-16 text-[#63997a]"
            >
              Problemas que eliminamos
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Clock className="h-16 w-16 text-[#fa7f4b] mb-6" />,
                  title: "Adiós a la espera",
                  description:
                    "Información en tiempo real. Sin más adivinanzas.",
                },
                {
                  icon: <MapPin className="h-16 w-16 text-[#63997a] mb-6" />,
                  title: "Ubicación precisa",
                  description: "Encuentra tu parada. Siempre.",
                },
                {
                  icon: (
                    <MessageSquare className="h-16 w-16 text-[#fa7f4b] mb-6" />
                  ),
                  title: "Tu voz importa",
                  description: "Reclamos efectivos. Mejoras reales.",
                },
              ].map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-lg shadow-lg border border-[#63997a]/20 hover:shadow-xl transition-shadow duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {problem.icon}
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4 text-[#63997a]">
                    {problem.title}
                  </h3>
                  <p className="text-xl text-gray-600 font-light">
                    {problem.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="mapa" className="py-20 bg-[#f8f8f8]">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-center mb-12 text-[#63997a]"
            >
              Formosa a tu alcance
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-[#63997a]/10 rounded-lg shadow-xl p-8 h-[500px] flex items-center justify-center hover:shadow-2xl transition-shadow duration-300"
            >
              <p className="text-3xl font-light text-[#63997a]">
                Explora el mapa interactivo de Formosa
              </p>
            </motion.div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {["Ver líneas", "Mostrar paradas", "Buscar ruta"].map(
                (action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-[#fa7f4b] text-white rounded-full hover:bg-[#fa7f4b]/90 transition-colors shadow-md hover:shadow-lg text-lg font-bold uppercase tracking-wide"
                  >
                    {action}
                  </motion.button>
                )
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

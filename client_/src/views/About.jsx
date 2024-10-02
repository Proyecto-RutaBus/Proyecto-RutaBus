'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Bus, Target, Eye } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const FadeInWhenVisible = ({ children }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <FadeInWhenVisible>
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Sobre RutaBus</h1>
            <p className="text-xl max-w-3xl mx-auto">
              En RutaBus, estamos dedicados a transformar la experiencia del transporte público. 
              Nuestro objetivo es proporcionar a los usuarios una plataforma fácil de usar para 
              explorar rutas de autobús, hacer seguimiento en tiempo real y gestionar sus trayectos 
              de manera eficiente.
            </p>
          </section>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <FadeInWhenVisible>
            <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Target className="mr-2" />
                Nuestra Misión
              </h2>
              <p>
                Facilitar el acceso a la información del transporte público, mejorando la 
                movilidad y la calidad de vida de nuestros usuarios.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible>
            <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Eye className="mr-2" />
                Nuestra Visión
              </h2>
              <p>
                Convertirnos en la plataforma líder para la gestión del transporte público, 
                ofreciendo soluciones innovadoras y tecnológicas para una Formosa del futuro.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible>
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">Conoce a Nuestro Equipo</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Pzocik Brandon",
                  role: "Desarrollador & Fundador",
                  image: "https://image.cdn2.seaart.ai/static/6b72b336f3b704bf09040e76c23c8fb3/20230410/d44c3682c50f0217bebc8c655a0ace56_high.webp"
                },
                {
                  name: "Miño Ailín Ayelen",
                  role: "Desarrolladora & Fundadora",
                  image: "https://img.freepik.com/fotos-premium/chica-anime-pelo-rojo-corto-puntiagudo-expresion-determinada_591266-916.jpg"
                },
                {
                  name: "Amarrilla Rodrigo",
                  role: "Desarrollador & Fundador",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb0EoCaY3herCOebqeYOmYK6bowcii_R-s2Q&s"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-4">Únete a Nuestra Misión</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Estamos siempre buscando mentes creativas y apasionadas para unirse a nuestro equipo. 
              Si te emociona la idea de transformar el transporte público, ¡queremos conocerte!
            </p>
            <motion.a 
              href="/careers" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bus className="mr-2" />
              Explora Nuestras Oportunidades
            </motion.a>
          </section>
        </FadeInWhenVisible>
      </main>
      <Footer />
    </div>
  )
}
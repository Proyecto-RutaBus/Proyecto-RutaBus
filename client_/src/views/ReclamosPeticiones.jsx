import React, { useState } from "react";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../style.css";

export default function ReclamosPeticiones() {
  const [tipo, setTipo] = useState("reclamo");
  const [texto, setTexto] = useState("");
  const [isAnonimo, setIsAnonimo] = useState(false);

  const handleTipoChange = (e) => setTipo(e.target.value);
  const handleTextoChange = (e) => setTexto(e.target.value);
  const handleAnonimoChange = () => setIsAnonimo(!isAnonimo);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { tipo, texto, isAnonimo });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f7f5]">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#63997a] to-[#fa7f4b] p-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Formulario de Reclamos y Peticiones
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label
                htmlFor="tipo"
                className="block text-[#63997a] font-semibold mb-2"
              >
                Seleccione el tipo de solicitud:
              </label>
              <div className="flex space-x-4 mt-2">
                {["reclamo", "peticion"].map((option) => (
                  <label key={option} className="flex-1">
                    <input
                      type="radio"
                      name="tipo"
                      value={option}
                      checked={tipo === option}
                      onChange={handleTipoChange}
                      className="sr-only"
                    />
                    <div
                      className={`
                      cursor-pointer text-center py-2 px-4 rounded-full transition-colors
                      ${
                        tipo === option
                          ? "bg-[#63997a] text-white"
                          : "bg-[#f3f7f5] text-[#63997a] hover:bg-[#e1e9e5]"
                      }
                    `}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="texto"
                className="block text-[#63997a] font-semibold mb-2"
              >
                {tipo === "reclamo"
                  ? "Escriba su reclamo"
                  : "Escriba su petición"}{" "}
                (máximo 300 palabras):
              </label>
              <textarea
                id="texto"
                name="texto"
                rows={5}
                maxLength={300}
                placeholder={`Escriba su ${tipo} aquí...`}
                value={texto}
                onChange={handleTextoChange}
                className="w-full p-3 border border-[#63997a] rounded-lg focus:ring-2 focus:ring-[#fa7f4b] focus:border-transparent transition-shadow"
              />
              <p className="text-sm text-[#63997a] mt-1">
                {texto.length} / 300 palabras
              </p>
            </div>

            <div>
              <label
                htmlFor="archivo"
                className="block text-[#63997a] font-semibold mb-2"
              >
                Subir archivo:
              </label>
              <div className="flex items-center justify-center w-full mt-2">
                <label
                  htmlFor="archivo"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#63997a] border-dashed rounded-lg cursor-pointer bg-[#f3f7f5] hover:bg-[#e1e9e5] transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-3 text-[#63997a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-[#63997a]">
                      <span className="font-semibold">
                        Haga clic para cargar
                      </span>{" "}
                      o arrastre y suelte
                    </p>
                    <p className="text-xs text-[#63997a]">
                      PDF, DOC, JPG o PNG (MAX. 10MB)
                    </p>
                  </div>
                  <input id="archivo" type="file" className="hidden" />
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonimo"
                checked={isAnonimo}
                onChange={handleAnonimoChange}
                className="w-4 h-4 text-[#fa7f4b] border-[#63997a] rounded focus:ring-[#fa7f4b]"
              />
              <label htmlFor="anonimo" className="ml-2 text-[#63997a]">
                Enviar de forma anónima
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#63997a] to-[#fa7f4b] text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-md hover:from-[#568469] hover:to-[#e57243] transition-all duration-300"
            >
              Enviar Solicitud
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export { ReclamosPeticiones };

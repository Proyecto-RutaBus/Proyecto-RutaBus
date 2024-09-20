import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style.css";

export const ReclamosPeticiones = () => {
  const [tipo, setTipo] = useState("reclamo");
  const [reclamo, setReclamo] = useState("");
  const [peticion, setPeticion] = useState("");
  const [isAnonimo, setIsAnonimo] = useState(false);

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  const handleReclamoChange = (e) => {
    setReclamo(e.target.value);
  };

  const handlePeticionChange = (e) => {
    setPeticion(e.target.value);
  };

  const handleAnonimoChange = (e) => {
    setIsAnonimo(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario
    alert("Su solicitud ha sido enviada con éxito.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full">
        <Header /> {/* Se agregó el Header */}
        <main>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Formulario de Reclamos y Peticiones
          </h1>
          <form
            id="solicitudForm"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <label htmlFor="tipo" className="block text-gray-700">
              Seleccione el tipo de solicitud:
            </label>
            <select
              id="tipo"
              name="tipo"
              value={tipo}
              onChange={handleTipoChange}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="reclamo">Reclamo</option>
              <option value="peticion">Petición</option>
            </select>

            {tipo === "reclamo" && (
              <div
                id="reclamoSection"
                className="bg-orange-200 p-4 rounded-md shadow-sm"
              >
                <label htmlFor="reclamo" className="block text-gray-700">
                  Escriba su reclamo (máximo 300 palabras):
                </label>
                <textarea
                  id="reclamo"
                  name="reclamo"
                  rows="10"
                  maxLength="300"
                  placeholder="Escriba su reclamo aquí..."
                  value={reclamo}
                  onChange={handleReclamoChange}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-gray-600">{reclamo.length} / 300 palabras</p>
              </div>
            )}

            {tipo === "peticion" && (
              <div
                id="peticionSection"
                className="bg-orange-200 p-4 rounded-md shadow-sm"
              >
                <label htmlFor="peticion" className="block text-gray-700">
                  Escriba su petición (máximo 300 palabras):
                </label>
                <textarea
                  id="peticion"
                  name="peticion"
                  rows="10"
                  maxLength="300"
                  placeholder="Escriba su petición aquí..."
                  value={peticion}
                  onChange={handlePeticionChange}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-gray-600">
                  {peticion.length} / 300 palabras
                </p>
              </div>
            )}

            <label htmlFor="archivo" className="block text-gray-700">
              Subir archivo:
            </label>
            <input
              type="file"
              id="archivo"
              name="archivo"
              className="block w-full p-2 border border-gray-300 rounded-md"
            />

            <label
              htmlFor="anonimo"
              className="flex items-center space-x-2 text-gray-700"
            >
              <input
                type="checkbox"
                id="anonimo"
                name="anonimo"
                checked={isAnonimo}
                onChange={handleAnonimoChange}
                className="form-checkbox"
              />
              <span>Enviar de forma anónima</span>
            </label>

            <button
              type="submit"
              id="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
            >
              Enviar
            </button>
          </form>
        </main>
        <Footer /> {/* Se agregó el Footer */}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../style.css";

export default function ReclamosPeticiones() {
  const [tipo, setTipo] = useState("reclamo");
  const [texto, setTexto] = useState("");
  const [isAnonimo, setIsAnonimo] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [archivo, setArchivo] = useState(null);

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
    setTexto(""); // Resetear el texto al cambiar tipo
    setWordCount(0); // Resetear contador de palabras al cambiar tipo
  };

  const handleTextoChange = (e) => {
    const newText = e.target.value;
    setTexto(newText);
    const count = newText.trim().split(/\s+/).length;
    if (count > 300) {
      setTexto(newText.split(/\s+/).slice(0, 300).join(" ")); // Limitar a 300 palabras
      setWordCount(300);
    } else {
      setWordCount(count);
    }
  };

  const handleAnonimoChange = () => setIsAnonimo(!isAnonimo);

  const handleFileChange = (e) => setArchivo(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tipo", tipo);
    formData.append("descripcion", texto);
    formData.append("anonimo", isAnonimo);
    if (!isAnonimo) {
      formData.append("usuarioId", userId); // Asegúrate de tener el ID del usuario disponible
      formData.append("nombre", userName); // Si deseas guardar el nombre del usuario
    }
    const archivo = document.getElementById("archivo").files[0];
    if (archivo) {
      formData.append("archivo", archivo);
    }

    try {
      const response = await fetch("http://localhost:3000/comunicaciones", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Solicitud enviada correctamente");
        // Aquí puedes manejar la respuesta después del envío
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
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
                      className={`cursor-pointer text-center py-2 px-4 rounded-full transition-colors ${
                        tipo === option
                          ? "bg-[#63997a] text-white"
                          : "bg-[#f3f7f5] text-[#63997a] hover:bg-[#e1e9e5]"
                      }`}
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
                {wordCount} / 300 palabras
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
                      {archivo ? archivo.name : "Arrastra y suelta un archivo"}
                    </p>
                    <p className="text-xs text-[#63997a]">
                      (PDF, DOC, JPG, PNG hasta 2MB)
                    </p>
                  </div>
                  <input
                    id="archivo"
                    type="file"
                    accept=".pdf,.doc,.jpg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonimo"
                checked={isAnonimo}
                onChange={handleAnonimoChange}
                className="mr-2"
              />
              <label htmlFor="anonimo" className="text-[#63997a]">
                Enviar de forma anónima
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#63997a] text-white font-semibold py-2 rounded-lg hover:bg-[#fa7f4b] transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export { ReclamosPeticiones };

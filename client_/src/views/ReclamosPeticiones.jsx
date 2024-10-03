import "../style.css";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ReclamosPeticiones() {
  const [tipo, setTipo] = useState("reclamo");
  const [texto, setTexto] = useState("");
  const [isAnonimo, setIsAnonimo] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [archivo, setArchivo] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [usuarioId, setUsuarioId] = useState(); // Estado para el ID del usuario
  const [nombre, setNombre] = useState(""); // Estado para el nombre del usuario

  // useEffect para obtener el usuario
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getUserData = async () => {
        try {
          const response = await fetch("http://localhost:3000/validarSesion", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUsuarioId(data.id); // Obtener ID del usuario
            setNombre(data.nombre); // Obtener nombre del usuario
            //console.log("Usuario ID:", data.id, "Nombre:", data.nombre); // Para verificar
          } else {
            console.error("Error en la validación de sesión:", data.message);
          }
        } catch (error) {
          console.error("Error obteniendo datos del usuario:", error);
        }
      };
      getUserData();
    }
  }, []);

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
    setTexto("");
    setWordCount(0);
  };

  const handleTextoChange = (e) => {
    const newText = e.target.value;
    setTexto(newText);
    const count = newText.trim().split(/\s+/).length;
    if (count > 300) {
      setTexto(newText.split(/\s+/).slice(0, 300).join(" "));
      setWordCount(300);
    } else {
      setWordCount(count);
    }
  };

  const handleAnonimoChange = () => setIsAnonimo(!isAnonimo);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setArchivo(e.target.files[0]);
    }
  };

  const clearForm = () => {
    setTipo("reclamo");
    setTexto("");
    setIsAnonimo(false);
    setWordCount(0);
    setArchivo(null);
    const fileInput = document.getElementById("archivo");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tipo", tipo);
    formData.append("descripcion", texto);
    formData.append("anonimo", isAnonimo.toString());

    // Agregar usuarioId y nombre al FormData
    if (usuarioId) {
      formData.append("usuarioId", usuarioId);
    }
    if (nombre) {
      formData.append("nombre", nombre);
    }

    if (archivo) {
      formData.append("archivo", archivo);
    }

    const token = localStorage.getItem("token"); // Asegúrate de que el token esté almacenado correctamente
    try {
      const response = await fetch("http://localhost:3000/api/comunicaciones", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token a las cabeceras
        },
        body: formData,
      });

      if (response.ok) {
        setMessage({
          text: "Su solicitud ha sido enviada correctamente.",
          type: "success",
        });
        clearForm();
      } else {
        const errorData = await response.json(); // Obtener el mensaje de error del servidor
        setMessage({
          text:
            errorData.message ||
            "No se pudo enviar su solicitud. Por favor, intente nuevamente.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setMessage({
        text: "No se pudo enviar su solicitud. Por favor, intente nuevamente.",
        type: "error",
      });
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
          {message.text && (
            <div
              className={`p-4 mb-4 ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
              role="alert"
            >
              <p className="font-bold">
                {message.type === "success" ? "Éxito" : "Error"}
              </p>
              <p>{message.text}</p>
            </div>
          )}
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
                className="w-full p-3 border text-black-500 border-[#63997a] rounded-lg focus:ring-2 focus:ring-[#fa7f4b] focus:border-transparent transition-shadow"
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
                    <p className="text-sm text-[#63997a]">
                      {archivo
                        ? archivo.name
                        : "Arrastra y suelta un archivo o haz clic para seleccionar"}
                    </p>
                  </div>
                  <input
                    id="archivo"
                    type="file"
                    accept=".jpg, .jpeg, .png, .pdf"
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
                Deseo enviar de manera anónima
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

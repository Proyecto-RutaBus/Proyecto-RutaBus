import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Lock, Edit2, Save, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Función para obtener los datos del usuario
const fetchUserData = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/validarSesion", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    return {
      name: data.nombre,
      email: data.email,
      birthDate: new Date(data.birthDate).toISOString().split("T")[0], // Solo la fecha
      password: "********", // Contraseña ocultada
    };
  } else {
    console.error("Error en la validación de sesión:", data.message);
    return null;
  }
};

// Función para actualizar los datos del usuario
const updateUserData = async (userData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:3000/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al actualizar los datos");
    }

    return { success: true };
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
    return { success: false };
  }
};

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    birthDate: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      const data = await fetchUserData();
      if (data) {
        setUser(data);
      } else {
        console.error("No se pudieron cargar los datos del usuario.");
      }
      setIsLoading(false);
    };
    loadUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      alert("Por favor ingresa un correo electrónico válido.");
      return;
    }

    if (user.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateUserData(user);
      if (response.success) {
        setIsEditing(false);
      } else {
        alert("Error al actualizar los datos");
      }
    } catch (error) {
      alert("Hubo un problema al actualizar los datos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f0f4f5] to-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden"
        >
          <div className="bg-[#63997a] p-8 text-white relative">
            <h1 className="text-4xl font-bold mb-2">Perfil de Usuario</h1>
            <p className="text-lg opacity-80">
              Gestiona tu información personal
            </p>
            <div className="absolute -bottom-12 right-8 bg-[#fa7f4b] rounded-full p-4 shadow-lg">
              <User size={40} className="text-white" />
            </div>
          </div>
          <div className="p-8 pt-16">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#63997a]"></div>
              </div>
            ) : isEditing ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {[
                  {
                    icon: <User />,
                    label: "Nombre",
                    name: "name",
                    type: "text",
                  },
                  {
                    icon: <Calendar />,
                    label: "Fecha de Nacimiento",
                    name: "birthDate",
                    type: "date",
                  },
                  {
                    icon: <Mail />,
                    label: "Correo Electrónico",
                    name: "email",
                    type: "email",
                  },
                  {
                    icon: <Lock />,
                    label: "Contraseña",
                    name: "password",
                    type: "password",
                  },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {React.cloneElement(field.icon, {
                          className: "h-5 w-5 text-gray-400",
                        })}
                      </div>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={user[field.name]}
                        onChange={handleInputChange}
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#63997a] focus:border-[#63997a] transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                ))}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#63997a]"
                  >
                    <X className="h-5 w-5 mr-2 text-gray-400" />
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#fa7f4b] hover:bg-[#F2D680] hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa7f4b]"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {isLoading ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {[
                  { icon: <User />, label: "Nombre", value: user.name },
                  {
                    icon: <Calendar />,
                    label: "Fecha de Nacimiento",
                    value: user.birthDate,
                  },
                  {
                    icon: <Mail />,
                    label: "Correo Electrónico",
                    value: user.email,
                  },
                  { icon: <Lock />, label: "Contraseña", value: "********" },
                ].map((field, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-10 w-10 flex items-center justify-center bg-[#63997a] rounded-full">
                        {React.cloneElement(field.icon, {
                          className: "h-5 w-5 text-white",
                        })}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        {field.label}
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {field.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div className="mt-8 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#fa7f4b] hover:bg-[#F2D680] hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa7f4b]"
                  >
                    <Edit2 className="h-5 w-5 mr-2" />
                    Editar Perfil
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

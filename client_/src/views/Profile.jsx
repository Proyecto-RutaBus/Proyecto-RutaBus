import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

// Simula una función para obtener los datos del usuario
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Juan Pérez",
        birthDate: "1990-01-01",
        email: "juan@example.com",
        password: "********",
      })
    }, 1000)
  })
}

// Simula una función para actualizar los datos del usuario
const updateUserData = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Datos actualizados:", userData)
      resolve({ success: true })
    }, 1000)
  })
}

export default function Profile() {
  const [user, setUser] = useState({ name: "", birthDate: "", email: "", password: "" })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true)
      const data = await fetchUserData()
      setUser(data)
      setIsLoading(false)
    }
    loadUserData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await updateUserData(user)
    setIsLoading(false)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f5]"> {/* Celeste muy clarito casi gris */}
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-[#63997a] p-6 text-white">
            <h1 className="text-3xl font-bold">Perfil de Usuario</h1>
          </div>
          <div className="p-6">
            {isLoading ? (
              <p className="text-center text-[#63997a]">Cargando...</p>
            ) : isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={user.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63997a] focus:ring focus:ring-[#63997a] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={user.birthDate}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63997a] focus:ring focus:ring-[#63997a] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63997a] focus:ring focus:ring-[#63997a] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63997a] focus:ring focus:ring-[#63997a] focus:ring-opacity-50"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-[#fa7f4b] text-white rounded-md hover:bg-[#e57243] focus:outline-none focus:ring-2 focus:ring-[#fa7f4b] focus:ring-opacity-50 transition duration-200"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#63997a]">Nombre</h3>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#63997a]">Fecha de Nacimiento</h3>
                  <p>{user.birthDate}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#63997a]">Correo Electrónico</h3>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#63997a]">Contraseña</h3>
                  <p>{user.password}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-[#fa7f4b] text-white rounded-md hover:bg-[#e57243] focus:outline-none focus:ring-2 focus:ring-[#fa7f4b] focus:ring-opacity-50 transition duration-200"
                >
                  Editar Perfil
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
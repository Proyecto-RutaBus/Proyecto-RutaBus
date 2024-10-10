import { useState, useEffect } from 'react' // Importamos useEffect para el manejo del evento global
import { MessageCircle, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Forum() {
  const [isOpen, setIsOpen] = useState(false) // Estado para controlar si el foro está abierto o cerrado
  const [comments, setComments] = useState([
    { id: 1, text: "¡Este es un comentario de ejemplo!" },
    { id: 2, text: "Aquí está otro comentario." }
  ])
  const [newComment, setNewComment] = useState("") // Estado para el nuevo comentario

  // Función para alternar entre abrir y cerrar el foro
  const toggleForum = () => {
    setIsOpen(!isOpen) // Cambia el estado de abierto a cerrado y viceversa
  }

  // Función para agregar un nuevo comentario
  const handleAddComment = () => {
    if (newComment.trim()) {
      // Agrega el nuevo comentario solo si el campo no está vacío
      setComments([...comments, { id: comments.length + 1, text: newComment }])
      setNewComment("") // Limpia el campo después de agregar
    }
  }

  // Efecto para detectar clics fuera del foro y cerrarlo
  useEffect(() => {
    // Función que se ejecutará al hacer clic en cualquier parte de la página
    const handleClickOutside = (event) => {
      // Si el foro está abierto y el clic no ocurrió dentro de la ventana emergente, lo cerramos
      if (isOpen && !event.target.closest('.foro-popup') && !event.target.closest('.foro-icon')) {
        setIsOpen(false) // Cierra el foro
      }
    }

    // Agrega el evento de clic al documento para detectar clics fuera del foro
    document.addEventListener('click', handleClickOutside)

    // Limpieza del efecto para evitar múltiples listeners
    return () => {
      document.removeEventListener('click', handleClickOutside) // Remueve el listener al desmontar el componente
    }
  }, [isOpen]) // El efecto se dispara cada vez que el foro se abre o se cierra

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Icono del foro, al hacer clic abre/cierra la ventana */}
      <Button
        onClick={toggleForum}
        className="rounded-full shadow-lg foro-icon" // Agregamos la clase "foro-icon" para distinguir el ícono
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Ventana emergente del foro */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-background rounded-lg shadow-lg w-80 p-4 max-h-[calc(100vh-6rem)] flex flex-col transition-all duration-300 ease-in-out animate-in slide-in-from-bottom-5 foro-popup">
          {/* Agregamos la clase "foro-popup" para distinguir la ventana */}
          <h2 className="text-lg font-bold mb-4">Lo que está diciendo la gente</h2>
          
          {/* Área de desplazamiento para los comentarios */}
          <ScrollArea className="flex-grow mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-muted p-3 my-2 rounded-lg">
                <p className="text-sm text-foreground">{comment.text}</p>
              </div>
            ))}
          </ScrollArea>

          {/* Campo para agregar un nuevo comentario */}
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Deja tu comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAddComment} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react';
import axios from 'axios'; // Importamos axios
import { MessageCircle, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Forum() {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Función para alternar entre abrir y cerrar el foro
  const toggleForum = () => {
    console.log("Toggle Forum:", !isOpen); // verifica que se este corriendo el toggle
    setIsOpen(!isOpen);
  };

  // Efecto para obtener comentarios al cargar el componente
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('/forums'); // Obtener comentarios desde la API
        setComments(response.data);
      } catch (error) {
        console.error('Error al obtener los comentarios:', error);
      }
    };

    fetchComments();
  }, []);

  // Función para agregar un nuevo comentario
  const handleAddComment = async () => {
    const token = localStorage.getItem('token');

    if (newComment.trim()) {
      try {
        const response = await axios.post('/forums', 
          { content: newComment }, 
          {
            headers: {
              Authorization: `Bearer ${token}`, // Acá enviamos el token
            },
          }
        );
        setComments([...comments, response.data]);
        setNewComment("");
      } catch (error) {
        console.error('Error al agregar el comentario:', error);
      }
    }
  };

  // Efecto para detectar clics fuera del foro y cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.foro-popup') && !event.target.closest('.foro-icon')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleForum}
        className="rounded-full shadow-lg foro-icon"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-background rounded-lg shadow-lg w-80 p-4 max-h-[calc(100vh-6rem)] flex flex-col transition-all duration-300 ease-in-out animate-in slide-in-from-bottom-5 foro-popup">
          <h2 className="text-lg font-bold mb-4">Lo que está diciendo la gente</h2>
          
          <ScrollArea className="flex-grow mb-4">
            {Array.isArray(comments) && comments.map((comment) => (
              <div key={comment._id} className="bg-muted p-3 my-2 rounded-lg">
              <p className="text-sm text-foreground">{comment.content}</p> {/* Comentario */}
              <p className="text-xs text-gray-500"> {/* Información adicional */}
                {comment.author?.nombre || 'Anónimo'} {/* Mostrar el nombre del autor */}
              </p>
              <p className="text-xs text-gray-400"> {/* Fecha del comentario */}
                {new Date(comment.createdAt).toLocaleString()} {/* Convertir la fecha a formato legible */}
              </p>
            </div>
            ))}
          </ScrollArea>

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
  );
}

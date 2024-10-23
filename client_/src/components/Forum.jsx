import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, Send, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Forum() {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const toggleForum = () => {
    console.log("Toggle Forum:", !isOpen);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('/forums');
        setComments(response.data);
      } catch (error) {
        console.error('Error al obtener los comentarios:', error);
      }
    };

    fetchComments();
  }, []);

  const handleAddComment = async () => {
    const token = localStorage.getItem('token');

    if (newComment.trim()) {
      try {
        const response = await axios.post('/forums', 
          { content: newComment }, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
        <div className="fixed bottom-20 right-4 bg-background rounded-lg shadow-lg w-96 p-4 max-h-[calc(100vh-6rem)] flex flex-col transition-all duration-300 ease-in-out animate-in slide-in-from-bottom-5 foro-popup">
          <h2 className="text-lg font-bold mb-4">Lo que está diciendo la gente</h2>
          
          <ScrollArea className="scroll-area-content flex-grow mb-4 pr-4">
            {Array.isArray(comments) && comments.map((comment) => (
              <div key={comment._id} className="bg-muted p-4 my-3 rounded-lg shadow">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary rounded-full p-1">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-semibold text-primary">{comment.author?.nombre || 'Anónimo'}</h3>
                      <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-sm text-foreground">{comment.content}</p>
                  </div>
                </div>
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
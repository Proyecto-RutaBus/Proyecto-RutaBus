import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Forum() {
  const [isOpen, setIsOpen] = useState(false)
  const [comments, setComments] = useState([
    { id: 1, text: "¡Este es un comentario de ejemplo!" },
    { id: 2, text: "Aquí está otro comentario." }
  ])
  const [newComment, setNewComment] = useState("")

  const toggleForum = () => {
    setIsOpen(!isOpen)
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment }])
      setNewComment("")
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleForum}
        className="rounded-full shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-background rounded-lg shadow-lg w-80 p-4 max-h-[calc(100vh-6rem)] flex flex-col transition-all duration-300 ease-in-out animate-in slide-in-from-bottom-5">
          <h2 className="text-lg font-bold mb-4">Lo que está diciendo la gente</h2>
          
          <ScrollArea className="flex-grow mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-muted p-3 my-2 rounded-lg">
                <p className="text-sm text-foreground">{comment.text}</p>
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
  )
}
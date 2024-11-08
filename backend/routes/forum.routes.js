import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
} from '../controllers/forum.controller.js';
import { verificarAutenticacion } from '../middleware/autenticacion.js';
const router = express.Router();

// Rutas del foro
router.post('/', verificarAutenticacion, createPost); // Crear un nuevo post
router.get('/', getPosts); // Obtener todos los posts
router.get('/:id', getPostById); // Obtener un post por ID
router.delete('/:id', verificarAutenticacion, deletePost); // Eliminar un post por ID

export default router;

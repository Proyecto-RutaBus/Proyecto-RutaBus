import mongoose from 'mongoose';

const ForumPostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Asumiendo que tienes un modelo de usuario
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ForumPost = mongoose.model('ForumPost', ForumPostSchema, 'ForumPost');

export default ForumPost;

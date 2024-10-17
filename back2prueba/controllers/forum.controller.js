import ForumPost from "../models/Forum.model.js";

// Crear un nuevo post en el foro
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const newPost = new ForumPost({
      content,
      author: req.usuarioId, //  información del usuario en req.user
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creando el post" });
  }
};

// Obtener todos los posts del foro
export const getPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find().populate("author", "nombre"); // Fijarse que el campo 'nombre' sea igual en el modelo de usuario
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error obteniendo los posts" });
  }
};

// Obtener un post por ID
export const getPostById = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id).populate(
      "author",
      "name"
    );
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error obteniendo el post" });
  }
};

// Eliminar un post por ID
export const deletePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    // Aquí puedes verificar si el usuario es el autor antes de eliminar
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar este post" });
    }

    await post.remove();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error eliminando el post" });
  }
};

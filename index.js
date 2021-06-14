const express = require("express");
const axios = require("axios");

const app = express();

app.get("/tarea/:idUsuario", async (req, res) => {
  try {
    // Post
    const respuestaPost = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const { idUsuario } = req.params;
    const infoPost = respuestaPost.data.filter(
      (post) => post.userId == idUsuario
    );
    // Respuestas
    const respuestaComentarios = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    const resultado = infoPost.map((publicacion) => ({
      ...publicacion,
      comentarios: respuestaComentarios.data.filter(
        (comentario) => comentario.postId == publicacion.id
      ),
    }));

    res.send(resultado);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log("Servidor iniciado en puerto 3000...");
});

module.exports = app;

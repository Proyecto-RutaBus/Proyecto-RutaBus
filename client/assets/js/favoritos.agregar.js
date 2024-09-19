document.addEventListener("DOMContentLoaded", function () {
  let favoritosContainer = document.getElementById("favoritos-container");
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  // Añadir el h1 si hay favoritos y no existe el h1
  if (favoritos.length > 0 && !document.getElementById("favoritos-title")) {
    let h1 = document.createElement("h1");
    h1.id = "favoritos-title";
    h1.style.textAlign = "center";
    h1.textContent = "Favoritos";
    favoritosContainer.insertBefore(h1, favoritosContainer.firstChild);
  }

  favoritos.forEach((favorito) => {
    let favoritoDiv = document.createElement("div");
    favoritoDiv.className = "favorito";
    favoritoDiv.innerHTML = `
    <div class="favorito-contenedor" style="display: flex; align-items: center; gap: 10px;">
        <div class="favorito-nombre"><strong>${favorito.nombre}</strong></div>
        <div class="favorito-info">${favorito.info}</div>
        <button class="eliminar-btn"><i class="fa-regular fa-trash-can"></i></button>
    </div>
`;

    // Añadir evento de clic al botón de eliminación
    let eliminarBtn = favoritoDiv.querySelector(".eliminar-btn");
    eliminarBtn.addEventListener("click", function () {
      // Buscar el índice del favorito en el array
      let index = favoritos.findIndex(
        (f) => f.nombre === favorito.nombre && f.info === favorito.info
      );
      if (index !== -1) {
        favoritos.splice(index, 1);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        favoritoDiv.remove();
      }
    });

    // Añadir el div al contenedor principal
    document.getElementById("favoritos-container").appendChild(favoritoDiv);
  });

  // Función para agregar un nuevo favorito
  async function agregarFavorito(nombre, info) {
    const token = localStorage.getItem("token"); // Asumiendo que el token está almacenado en localStorage

    const response = await fetch("/favoritos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre, info }),
    });

    if (response.ok) {
      const nuevoFavorito = await response.json();
      favoritos.push({ nombre, info });
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      location.reload(); // Recargar la página para mostrar el nuevo favorito
    } else {
      console.error("Error al agregar el favorito");
    }
  }

  // Ejemplo de uso de la función agregarFavorito
  document.getElementById("btnFavorito").addEventListener("click", function () {
    const nombre = document.getElementById("nombreParada").value;
    const info = document.getElementById("infoParada").value;
    agregarFavorito(nombre, info);
  });
});

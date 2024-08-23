document.addEventListener("DOMContentLoaded", function() {
    let favoritosContainer = document.getElementById("favoritos-container");
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos.forEach((favorito) => {
        let favoritoDiv = document.createElement("div");
        favoritoDiv.className = "favorito";
        favoritoDiv.innerHTML = `
            <strong>${favorito.info}</strong>
            <button class="eliminar-btn"><i class="fa-regular fa-trash-can"></i></button>
        `;

        // Añadir evento de clic al botón de eliminación
        let eliminarBtn = favoritoDiv.querySelector(".eliminar-btn");
        eliminarBtn.addEventListener("click", function() {
            // Buscar el índice del favorito en el array
            let index = favoritos.findIndex(f => f.info === favorito.info && f.nombre === favorito.nombre);
            if (index !== -1) {
                // Eliminar el favorito del array
                favoritos.splice(index, 1);
                // Actualizar el localStorage
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
                // Eliminar el elemento del DOM
                favoritoDiv.remove();
            }
        });

        favoritosContainer.appendChild(favoritoDiv);
    });
});
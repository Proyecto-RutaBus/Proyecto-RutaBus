document.addEventListener("DOMContentLoaded", function() {
    let favoritosContainer = document.getElementById("favoritos-container");
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos.forEach((favorito) => {
        let favoritoDiv = document.createElement("div");
        favoritoDiv.className = "favorito";
        favoritoDiv.innerHTML = `
            <strong>${favorito.nombre}</strong><br>
            Coordenadas: ${favorito.coordenadas.lat}, ${favorito.coordenadas.lng}
        `;
        favoritosContainer.appendChild(favoritoDiv);
    });
});
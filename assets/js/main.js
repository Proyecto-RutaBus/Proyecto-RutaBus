const mapa = document.getElementById("mapa");
const listaLineas = document.getElementById("lista-lineas");


var map = L.map('mapa').setView([-26.1849, -58.1731], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-26.1849, -58.1731]).addTo(map)
    .bindPopup('Formosa, Argentina')
    .openPopup();


// Ejemplo de líneas de autobús
const lineas = [
    { nombre: "Línea 1", coordenadas: [[-26.1849, -58.1731], [-26.2, -58.2]] },
    { nombre: "Línea 2", coordenadas: [[-26.1849, -58.1731], [-26.3, -58.3]] },
];

// Función para alternar la visibilidad de la lista de líneas
function toggleLineas() {
    if (listaLineas.style.display === "none") {
        listaLineas.style.display = "block";
    } else {
        listaLineas.style.display = "none";
    }
}

// Añadir líneas de autobús a la lista y al mapa
lineas.forEach(linea => {
    // Añadir línea a la lista desplegable
    const item = document.createElement("div");
    item.className = "linea-item";
    item.innerText = linea.nombre;
    item.onclick = () => {
        L.polyline(linea.coordenadas, { color: 'blue' }).addTo(map);
    };
    listaLineas.appendChild(item);
});
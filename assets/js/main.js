// main.js

// Ejemplo de líneas de autobús
const lineas = [
    { 
        nombre: "Línea 1", 
        paradas: [
            { nombre: "Parada 1", coordenadas: [-26.173486, -58.197993] },
            { nombre: "Parada 2", coordenadas: [-26.172010, -58.193524] },
            { nombre: "Parada 3", coordenadas: [-26.171198, -58.191105] },
            { nombre: "Parada 4", coordenadas: [-26.170016, -58.187554] }
        ]
    },
    { 
        nombre: "Línea 2", 
        paradas: [
            { nombre: "Parada 1", coordenadas: [-26.167472, -58.192312] },
            { nombre: "Parada 2", coordenadas: [-26.168799, -58.191826] },
            { nombre: "Parada 3", coordenadas: [-26.170475, -58.191139] },
            { nombre: "Parada 4", coordenadas: [-26.171746, -58.190581] }
        ]
    }
];

let marcadores = [];

// Función para alternar la visibilidad de las líneas
function toggleLineas() {
    const listaLineas = document.getElementById("lista-lineas");
    if (listaLineas.style.display === "none") {
        listaLineas.style.display = "block";
    } else {
        listaLineas.style.display = "none";
        // Limpiar los marcadores del mapa al ocultar las líneas
        limpiarMapa();
    }
}

// Función para limpiar los marcadores del mapa
function limpiarMapa() {
    marcadores.forEach(marker => mapa.removeLayer(marker));
    marcadores = [];
}

// Función para mostrar las paradas de una línea seleccionada
function mostrarParadas(lineaSeleccionada) {
    // Limpiar marcadores anteriores
    limpiarMapa();

    // Buscar la línea seleccionada
    const linea = lineas.find(l => l.nombre === lineaSeleccionada);
    if (linea) {
        // Añadir marcadores para cada parada de la línea
        linea.paradas.forEach(parada => {
            const marker = L.marker(parada.coordenadas).addTo(mapa)
                .bindPopup(`${parada.nombre} - ${linea.nombre}`)
                .openPopup();
            marcadores.push(marker);
        });
    }
}

// Añadir líneas de autobús a la lista y configurar el evento onclick
const listaLineas = document.getElementById("lista-lineas");
lineas.forEach(linea => {
    const item = document.createElement("div");
    item.className = "linea-item";
    item.innerText = linea.nombre;
    item.onclick = () => {
        // Deseleccionar todas las líneas
        document.querySelectorAll('.linea-item').forEach(item => {
            item.classList.remove('selected');
        });

        // Seleccionar la línea actual
        item.classList.add('selected');

        // Mostrar las paradas de la línea seleccionada
        mostrarParadas(linea.nombre);
    };
    listaLineas.appendChild(item);
});

// Inicializar el mapa con Leaflet
const mapa = L.map('mapa').setView([-26.1849, -58.1731], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);

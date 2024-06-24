// Ejemplo de líneas de autobús
const lineas = [
    { 
        nombre: "Línea 1", 
        paradas: [
            { nombre: "Parada 1", coordenadas: [-26.173486, -58.197993] },
            { nombre: "Parada 2", coordenadas: [-26.172010, -58.193524] },
            { nombre: "Parada 3", coordenadas: [-26.171198, -58.191105] },
            { nombre: "Parada 4", coordenadas: [-26.170016, -58.187554] },
            { nombre: "Parada 5", coordenadas: [-26.169016, -58.184624] }, 
            { nombre: "Parada 6", coordenadas: [-26.168482, -58.182715] }, 
            { nombre: "Parada 7", coordenadas: [-26.168700, -58.182459] }, 
            { nombre: "Parada 8", coordenadas: [-26.172643, -58.180862] } 
        ]
    },
    { 
        nombre: "Línea 2", 
        paradas: [
            { nombre: "Parada 1", coordenadas: [-26.167472, -58.192312] },
            { nombre: "Parada 2", coordenadas: [-26.168799, -58.191826] },
            { nombre: "Parada 3", coordenadas: [-26.170475, -58.191139] },
            { nombre: "Parada 4", coordenadas: [-26.171746, -58.190581] },
            { nombre: "Parada 5", coordenadas: [-26.173372, -58.189864] }, 
            { nombre: "Parada 6", coordenadas: [-26.176290, -58.188732] }, 
            { nombre: "Parada 7", coordenadas: [-26.179121, -58.187600] }, 
            { nombre: "Parada 8", coordenadas: [-26.180224, -58.188672] }, 
            { nombre: "Parada 9", coordenadas: [-26.180710, -58.190214] }
        ]
    }
];

let marcadores = [];
let polilineas = [];

// Función para alternar la visibilidad de las líneas
function toggleLineas() {
    const listaLineas = document.getElementById("lista-lineas");
    if (listaLineas.style.display === "none") {
        listaLineas.style.display = "block";
    } else {
        listaLineas.style.display = "none";
        // Limpiar los marcadores y polilíneas del mapa al ocultar las líneas
        limpiarMapa();
    }
}

// Función para limpiar los marcadores y polilíneas del mapa
function limpiarMapa() {
    marcadores.forEach(marker => mapa.removeLayer(marker));
    marcadores = [];

    polilineas.forEach(polyline => mapa.removeLayer(polyline));
    polilineas = [];
}

// Función para mostrar las paradas y recorrido de una línea seleccionada
function mostrarParadasYRecorrido(lineaSeleccionada) {
    // Limpiar marcadores y polilíneas anteriores
    limpiarMapa();

    // Buscar la línea seleccionada
    const linea = lineas.find(l => l.nombre === lineaSeleccionada);
    if (linea) {
        // Añadir marcadores para cada parada de la línea
        linea.paradas.forEach((parada, index) => {
            const marker = L.marker(parada.coordenadas).addTo(mapa)
                .bindPopup(`${parada.nombre} - ${linea.nombre}`)
                .openPopup();
            marcadores.push(marker);

            // Si hay más de una parada, trazar una polilínea entre ellas
            if (index > 0) {
                const coordsAnterior = linea.paradas[index - 1].coordenadas;
                const coordsActual = parada.coordenadas;
                const polyline = L.polyline([coordsAnterior, coordsActual], { color: 'blue' }).addTo(mapa);
                polilineas.push(polyline);
            }
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

        // Mostrar las paradas y recorrido de la línea seleccionada
        mostrarParadasYRecorrido(linea.nombre);
    };
    listaLineas.appendChild(item);
});

// Inicializar el mapa con Leaflet
const mapa = L.map('mapa').setView([-26.1849, -58.1731], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);


// Logica para mostrar el icono de perfil una vez logeado

document.addEventListener('DOMContentLoaded', () => {
    // Verificar el estado de inicio de sesión
    const isLoggedIn = localStorage.getItem('token');

    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const userIcon = document.getElementById('userIcon');

    if (isLoggedIn) {
        // Usuario ha iniciado sesión, ocultar botones de registro e inicio de sesión, mostrar icono de usuario
        registerBtn.style.display = 'none';
        loginBtn.style.display = 'none';
        userIcon.style.display = 'block';
    } else {
        // Usuario no ha iniciado sesión, mostrar botones de registro e inicio de sesión, ocultar icono de usuario
        registerBtn.style.display = 'block';
        loginBtn.style.display = 'block';
        userIcon.style.display = 'none';
    }
});

function logout() {
    // Al cerrar sesión, eliminamos el estado de inicio de sesión y recargamos la página
    localStorage.removeItem('token');
    location.reload();
}

function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
}

// Función de ejemplo para iniciar sesión (debería ser reemplazada por una llamada a tu API de autenticación)
function login() {
    localStorage.setItem('isLoggedIn', true);
    location.reload();
}
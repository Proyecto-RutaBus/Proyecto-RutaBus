
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

// Ejemplo de líneas de autobús
const lineas = [
    {
        nombre: "Línea 60",
        paradas:  [
            { "nombre": "Parada 1", "coordenadas": [-26.150057, -58.156032], "info": "Avenida 1 - Avenida 2" },
            { "nombre": "Parada 2", "coordenadas": [-26.151816, -58.161610], "info": "Avenida 3 - Avenida 4" },
            { "nombre": "Parada 3", "coordenadas": [-26.154955, -58.171390], "info": "Avenida 5 - Avenida 6" },
            { "nombre": "Parada 4", "coordenadas": [-26.157726, -58.180089], "info": "Avenida 7 - Avenida 8" },
            { "nombre": "Parada 5", "coordenadas": [-26.159407, -58.184959], "info": "Avenida 9 - Avenida 10" },
            { "nombre": "Parada 6", "coordenadas": [-26.168623, -58.183210], "info": "Avenida 11 - Avenida 12" },
            { "nombre": "Parada 7", "coordenadas": [-26.171480, -58.190590], "info": "Avenida 13 - Avenida 14" },
            { "nombre": "Parada 8", "coordenadas": [-26.174704, -58.189294], "info": "Avenida 15 - Avenida 16" },
            { "nombre": "Parada 9", "coordenadas": [-26.180525, -58.189448], "info": "Avenida 17 - Avenida 18" },
            { "nombre": "Parada 10", "coordenadas": [-26.184292, -58.200978], "info": "Avenida 19 - Avenida 20" },
            { "nombre": "Parada 11", "coordenadas": [-26.190323, -58.219654], "info": "Avenida 21 - Avenida 22" }
        ],
        recorrido: [
            [-26.150057, -58.156032], [-26.151066, -58.159243], [-26.151816, -58.161610],
            [-26.152676, -58.164412], [-26.154955, -58.171390], [-26.156330, -58.175737],
            [-26.157726, -58.180089], [-26.158867, -58.183588], [-26.159097, -58.184017],
            [-26.157774, -58.184597], [-26.157393, -58.184717], [-26.156839, -58.185141],
            [-26.156554, -58.185384], [-26.156589, -58.185684], [-26.156982, -58.185787],
            [-26.157584, -58.185450], [-26.157976, -58.185335], [-26.158341, -58.185353],
            [-26.159407, -58.184959], [-26.160946, -58.184290], [-26.164458, -58.182901],
            [-26.166742, -58.182010], [-26.167417, -58.181729], [-26.168189, -58.181831],
            [-26.168240, -58.181827], [-26.168623, -58.183210], [-26.169995, -58.187292],
            [-26.171011, -58.190354], [-26.171156, -58.190773], [-26.171480, -58.190590],
            [-26.172926, -58.190003], [-26.174704, -58.189294], [-26.178351, -58.187855],
            [-26.179779, -58.187261], [-26.180525, -58.189448], [-26.181406, -58.192071],
            [-26.182879, -58.196575], [-26.184292, -58.200978], [-26.188523, -58.213969],
            [-26.188730, -58.215529], [-26.189151, -58.216226], [-26.190323, -58.219654],
            [-26.193668, -58.229904]
        ]
    },
    { 
        nombre: "Línea 25", 
        paradas: [
            { "nombre": "Parada 1", "coordenadas": [-26.214845, -58.232006], "info": "Avenida 1 - Avenida 2" },
            { "nombre": "Parada 2", "coordenadas": [-26.210972, -58.229451], "info": "Avenida 3 - Avenida 4" },
            { "nombre": "Parada 3", "coordenadas": [-26.206852, -58.226795], "info": "Avenida 5 - Avenida 6" },
            { "nombre": "Parada 4", "coordenadas": [-26.197964, -58.212417], "info": "Avenida 7 - Avenida 8" },
            { "nombre": "Parada 5", "coordenadas": [-26.196692, -58.208571], "info": "Avenida 9 - Avenida 10" },
            { "nombre": "Parada 6", "coordenadas": [-26.195757, -58.205719], "info": "Avenida 11 - Avenida 12" },
            { "nombre": "Parada 7", "coordenadas": [-26.194366, -58.201958], "info": "Avenida 13 - Avenida 14" },
            { "nombre": "Parada 8", "coordenadas": [-26.186808, -58.178743], "info": "Avenida 15 - Avenida 16" },
            { "nombre": "Parada 9", "coordenadas": [-26.186026, -58.172935], "info": "Avenida 17 - Avenida 18" },
            { "nombre": "Parada 10", "coordenadas": [-26.183273, -58.168049], "info": "Avenida 19 - Avenida 20" },
            { "nombre": "Parada 11", "coordenadas": [-26.180086, -58.164836], "info": "Avenida 21 - Avenida 22" },
            { "nombre": "Parada 12", "coordenadas": [-26.173209, -58.1667], "info": "Avenida 23 - Avenida 24" }
        ],
        recorrido: [
            [-26.214845, -58.232006], [-26.214325, -58.231691], [-26.213607, -58.231379], 
            [-26.213324, -58.231428], [-26.213060, -58.231287], [-26.212946, -58.231097], 
            [-26.212694, -58.230971], [-26.212510, -58.230913], [-26.212227, -58.230576], 
            [-26.212072, -58.230275], [-26.211815, -58.230020], [-26.211450, -58.229766], 
            [-26.210972, -58.229451], [-26.210119, -58.228884], [-26.209070, -58.228197], 
            [-26.207891, -58.227487], [-26.207362, -58.227132], [-26.206852, -58.226795], 
            [-26.206852, -58.226795], [-26.202981, -58.224281], [-26.202259, -58.223763], 
            [-26.200891, -58.221865], [-26.200405, -58.220706], [-26.199964, -58.219562], 
            [-26.199674, -58.218658], [-26.199110, -58.216899], [-26.198664, -58.215505], 
            [-26.198389, -58.214711], [-26.198226, -58.214101], [-26.198209, -58.213793], 
            [-26.198262, -58.213483], [-26.198205, -58.213228], [-26.198055, -58.212756], 
            [-26.197964, -58.212417], [-26.197839, -58.212155], [-26.197795, -58.211955], 
            [-26.197694, -58.211773], [-26.197584, -58.211385], [-26.197503, -58.211061], 
            [-26.197186, -58.210102], [-26.196692, -58.208571], [-26.196311, -58.207400], 
            [-26.195757, -58.205719], [-26.195435, -58.204737], [-26.194976, -58.203340], 
            [-26.194759, -58.202913], [-26.194572, -58.202577], [-26.194366, -58.201958], 
            [-26.192507, -58.196795], [-26.191465, -58.193489], [-26.190829, -58.191427], 
            [-26.190305, -58.189753], [-26.190263, -58.189441], [-26.189718, -58.187862], 
            [-26.188703, -58.184739], [-26.188053, -58.182577], [-26.186808, -58.178743], 
            [-26.185966, -58.176198], [-26.185731, -58.175590], [-26.186785, -58.175133], 
            [-26.186026, -58.172935], [-26.185913, -58.172682], [-26.184972, -58.173054], 
            [-26.184342, -58.171405], [-26.183910, -58.169968], [-26.183273, -58.168049], 
            [-26.182172, -58.164751], [-26.181945, -58.164008], [-26.180086, -58.164836], 
            [-26.178022, -58.165648], [-26.173921, -58.167263], [-26.173561, -58.167438], 
            [-26.173209, -58.166794], [-26.172765, -58.166665], [-26.170092, -58.166467]
        ]
    }
];

let map = L.map('mapa').setView([-26.173486, -58.197993], 13);

// Añadir el mapa base de Leaflet
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let markers = [];
let polyline = null;

// Función para mostrar u ocultar las paradas
function toggleParadas() {
    let checkbox = document.getElementById('toggle-paradas');
    if (checkbox.checked) {
        markers.forEach(marker => marker.addTo(map));
    } else {
        markers.forEach(marker => marker.remove());
    }
}

// Función para mostrar una línea específica
function mostrarLinea(linea) {
    if (polyline) {
        map.removeLayer(polyline);
    }
    polyline = L.polyline(linea.recorrido, {color: 'red'}).addTo(map);
    map.fitBounds(polyline.getBounds());

    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    linea.paradas.forEach(parada => {
        let contenidoPopup = `
            <div style="display: flex; align-items: center;">
                <img src="./assets/img/icono-favorito.png" alt="Estrella-favorito" style="width: 30px; height: 30px; margin-right: 5px;">
                <div>
                    ${parada.nombre}
                    ${parada.info ? `<br>${parada.info}` : ''}
                </div>
                <img src="./assets/img/icono-colectivo.png" alt="Colectivo" style="width: 30px; height: 30px; margin-left: 5px;">
            </div>
        `;
        let marker = L.marker(parada.coordenadas).bindPopup(contenidoPopup);
        if (document.getElementById('toggle-paradas').checked) {
            marker.addTo(map);
        }
        markers.push(marker);
    });
}


// Mostrar la lista de líneas de autobús
function mostrarListaLineas() {
    let listaLineas = document.getElementById('lista-lineas');
    listaLineas.innerHTML = '';
    lineas.forEach((linea, index) => {
        let item = document.createElement('div');
        item.className = 'linea-item';
        item.textContent = linea.nombre;
        item.addEventListener('click', () => mostrarLinea(linea));
        listaLineas.appendChild(item);
    });
}

function toggleLineas() {
    let listaLineas = document.getElementById('lista-lineas');
    if (listaLineas.style.display === 'none') {
        listaLineas.style.display = 'block';
    } else {
        listaLineas.style.display = 'none';
    }
}

// Event listener para el checkbox de paradas
document.getElementById('toggle-paradas').addEventListener('change', toggleParadas);

mostrarListaLineas();


// Inicializar el mapa con Leaflet
const mapa = L.map('mapa').setView([-26.1849, -58.1731], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);



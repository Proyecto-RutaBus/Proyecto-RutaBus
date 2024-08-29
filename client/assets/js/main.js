// Logica para mostrar el icono de perfil una vez logeado

document.addEventListener("DOMContentLoaded", () => {
  // Verificar el estado de inicio de sesión
  const isLoggedIn = localStorage.getItem("token");

  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const userIcon = document.getElementById("userIcon");

  const carousel = document.getElementById("carouselExampleFade");
  const informacionSeccion = document.getElementById("informacionSeccion");

  if (isLoggedIn) {
    // Usuario ha iniciado sesión, ocultar botones de registro e inicio de sesión, mostrar icono de usuario
    registerBtn.style.display = "none";
    loginBtn.style.display = "none";
    userIcon.style.display = "block";

    // Ocultar carrusel y sección de información
    carousel.style.display = "none";
    informacionSeccion.style.display = "none";
  } else {
    // Usuario no ha iniciado sesión, mostrar botones de registro e inicio de sesión, ocultar icono de usuario
    registerBtn.style.display = "block";
    loginBtn.style.display = "block";
    userIcon.style.display = "none";

    // Mostrar carrusel y sección de información
    carousel.style.display = "block";
    informacionSeccion.style.display = "block";
  }

  document.body.addEventListener("click", function (event) {
    if (event.target && event.target.id === "favoritoBtn") {
      alert("Parada agregada a favoritos!");
    }
  });
});

function logout() {
  // Al cerrar sesión, eliminamos el estado de inicio de sesión y recargamos la página
  localStorage.removeItem("token");
  location.reload();
}

function toggleUserMenu() {
  const userMenu = document.getElementById("userMenu");
  userMenu.style.display =
    userMenu.style.display === "block" ? "none" : "block";
}

// Función de ejemplo para iniciar sesión (debería ser reemplazada por una llamada a tu API de autenticación)
function login() {
  localStorage.setItem("isLoggedIn", true);
  location.reload();
}

// Ejemplo de líneas de autobús
const lineas = [
  {
    nombre: "Línea A",
    paradas: [
      {
        nombre: "Nueva Pompeya",
        coordenadas: [-26.27287017532025, -58.27325237521835],
        info: "Ruta Nacional N°11",
      },
      {
        nombre: "Rotonda Villa del Carmen",
        coordenadas: [-26.251103602770094, -58.25551733287651],
        info: "Ruta Nacional N°11",
      },
      {
        nombre: "Aeropuerto Internacional de Formosa",
        coordenadas: [-26.212835086263524, -58.230997994552226],
        info: "Ruta Nacional N°11",
      },
      {
        nombre: "Cruz del Norte",
        coordenadas: [-26.198108515099456, -58.212856103397215],
        info: "Av. Dr. Luis Gutniski",
      },
      {
        nombre: "Universidad Nacional de Formosa",
        coordenadas: [-26.193869905684224, -58.20071549269284],
        info: "Av. Dr. Luis Gutniski",
      },
      {
        nombre: "Terminal de Ómnibus",
        coordenadas: [-26.19172893595013, -58.19410500789917],
        info: "Av. Dr. Luis Gutniski",
      },
      {
        nombre: "Cementerio Nuestra Sra. del Carmen",
        coordenadas: [-26.188155969123834, -58.18294114108052],
        info: "Av. 25 de Mayo",
      },
      {
        nombre: "Plaza San Martin",
        coordenadas: [-26.18623726715076, -58.17343866827633],
        info: "José María Uriburu",
      },
      {
        nombre: "Hospital Central",
        coordenadas: [-26.18815646284242, -58.16859784770887],
        info: "Fotheringham",
      },
    ],
    recorrido: [
      [-26.273634023638834, -58.27394168484561],
      [-26.268915623086556, -58.26969237483152],
      [-26.265380738169753, -58.26661840248015],
      [-26.263110579836493, -58.264629363750515],
      [-26.259521756125828, -58.261469855214685],
      [-26.25738121432557, -58.259661638187126],
      [-26.25616497981865, -58.25879369401464],
      [-26.251662756030676, -58.25596532581875],
      [-26.251678973202978, -58.25578450411581],
      [-26.25158167013506, -58.25556751807247],
      [-26.251403280964723, -58.25547710722144],
      [-26.25120867428469, -58.25547710722144],
      [-26.251046501802193, -58.25545902505124],
      [-26.24955450434455, -58.25451875219704],
      [-26.240840447709495, -58.24883877949722],
      [-26.236345072895993, -58.24593561120919],
      [-26.231759919329924, -58.24301595563264],
      [-26.218925335918755, -58.23459960753409],
      [-26.213894041299632, -58.23137330505887],
      [-26.213690675911757, -58.231328146995466],
      [-26.213475309133948, -58.231360089780324],
      [-26.213273437152765, -58.23139491711032],
      [-26.213130165700953, -58.2313331027276],
      [-26.213007319340377, -58.231111903049396],
      [-26.212879852818787, -58.23099888326516],
      [-26.212653021414084, -58.23093480380372],
      [-26.21248793443967, -58.230837135945706],
      [-26.212226990653022, -58.23052403749979],
      [-26.211857249816653, -58.23007071942982],
      [-26.211645666077715, -58.22987733905843],
      [-26.20859414515175, -58.22792077028028],
      [-26.207429893381246, -58.227165078586864],
      [-26.204329198777728, -58.225190012200045],
      [-26.20249198318912, -58.223968011668845],
      [-26.202131087457047, -58.2236257580374],
      [-26.201642433871974, -58.2231314368677],
      [-26.2012775578141, -58.222608986658315],
      [-26.200859892710604, -58.22186471730423],
      [-26.20009130838521, -58.219864238205716],
      [-26.199719670606626, -58.218771113876855],
      [-26.198987610611262, -58.216506833531014],
      [-26.19844724954131, -58.21480842053927],
      [-26.19820789696331, -58.21412566240508],
      [-26.19823442199872, -58.21368686400672],
      [-26.19825947046766, -58.21341929881844],
      [-26.19791713110846, -58.21227785363267],
      [-26.197832449338676, -58.21211939753718],
      [-26.197659298726634, -58.21202780850244],
      [-26.197476993558432, -58.21178610727519],
      [-26.197130864995025, -58.210869985245694],
      [-26.196910465052838, -58.21019906845551],
      [-26.194792039564817, -58.20366682552505],
      [-26.193020906212567, -58.19822864347269],
      [-26.190000273524724, -58.18874334892004],
      [-26.187264630337182, -58.18011680202969],
      [-26.185802366549616, -58.17556449992726],
      [-26.18678139152574, -58.17517187343398],
      [-26.185969422340015, -58.172677422962224],
      [-26.184478341530074, -58.16813889866596],
      [-26.184109460534792, -58.16698165650878],
      [-26.187212787316582, -58.16575759807155],
      [-26.189412656566816, -58.17253409054112],
      [-26.19025737096254, -58.17508243936565],
      [-26.18614415285038, -58.176735373738126],
    ],
  },
  {
    nombre: "Línea B",
    paradas: [
      {
        nombre: "Hospital Evita",
        coordenadas: [-26.18023946317198, -58.19786232901334],
        info: "Av. 28 de Junio",
      },
      {
        nombre: "Hospital 2 de Abril",
        coordenadas: [-26.17249600473017, -58.19487991679101],
        info: "Av. Italia",
      },
      {
        nombre: "Plaza Tematica",
        coordenadas: [-26.173521941424532, -58.179210438020874],
        info: "Av. Juan Domingo Perón",
      },
      {
        nombre: "Plaza San Martin",
        coordenadas: [-26.185141103213006, -58.17584091289481],
        info: "Sarmiento",
      },
      {
        nombre: "Anfiteatro de la Juventud",
        coordenadas: [-26.19350130394575, -58.170241917314215],
        info: "Av. Napoleón Uriburu",
      },
      {
        nombre: "Centro de Salud Bernardino Rivadavia",
        coordenadas: [-26.199329390025575, -58.15221749783382],
        info: "D'augero",
      },
      {
        nombre: "Club Caza Y Pesca ",
        coordenadas: [-26.202658317788746, -58.149746069776455],
        info: "Patagonia",
      },
    ],
    recorrido: [
      [-26.18272488358796, -58.196985414368385],
      [-26.178047493465563, -58.19884749296669],
      [-26.174282826418406, -58.200344318768785],
      [-26.172782112670063, -58.19565091995483],
      [-26.171186633801504, -58.190921200665684],
      [-26.168341293724602, -58.18202076648542],
      [-26.168353935155928, -58.18204146772352],
      [-26.16842446797022, -58.1817993182344],
      [-26.16936678696743, -58.181437990227664],
      [-26.172398626795108, -58.18025310734134],
      [-26.172398626795108, -58.18025310734134],
      [-26.172469157163526, -58.18001095785277],
      [-26.17242778478574, -58.17966451678515],
      [-26.17451136502426, -58.1787914703247],
      [-26.17624606544456, -58.178101103507004],
      [-26.182081909673585, -58.17579528096908],
      [-26.184118601832672, -58.174960477372565],
      [-26.184532248501753, -58.176077749942095],
      [-26.18681041538055, -58.17524633237308],
      [-26.18642403284801, -58.17405450314763],
      [-26.19241393385024, -58.17160487071057],
      [-26.19377175395187, -58.17109124283438],
      [-26.192936898048806, -58.16856568867911],
      [-26.19243865234681, -58.16726956787515],
      [-26.192053434480663, -58.166238745930386],
      [-26.191541647249643, -58.16460213104375],
      [-26.191323966956766, -58.16368749464631],
      [-26.19084000454354, -58.162056826744646],
      [-26.190448871963454, -58.16097651321844],
      [-26.18959151394393, -58.158414030382346],
      [-26.192722319353543, -58.157153952272495],
      [-26.196298708623793, -58.15567666507256],
      [-26.19563960469037, -58.15363880912122],
      [-26.201762806126567, -58.151249907657146],
      [-26.20150820865129, -58.150248141926824],
      [-26.20585724568135, -58.14844469473506],
      [-26.206040202441926, -58.14838735717798],
      [-26.20673888893048, -58.15053014327603],
    ],
  },
  {
    nombre: "Línea C",
    paradas: [
      {
        nombre: "Namqom",
        coordenadas: [-26.110758632923115, -58.216805450020416],
        info: "S/C",
      },
      {
        nombre: "Tiro Federal de Formosa",
        coordenadas: [-26.127790435037774, -58.21091425290827],
        info: "Ruta Nacional N°11",
      },
      {
        nombre: "Rotonda- Monumento a la Virgen del Carmen",
        coordenadas: [-26.15677798288015, -58.18579330907224],
        info: "Ruta Nacional N°11",
      },
      {
        nombre: "REFSA- Direccion de Arquitectura",
        coordenadas: [-26.166833185761362, -58.17752809033921],
        info: "Av. Tte. Aramburu",
      },
      {
        nombre: "Casa de Gobierno",
        coordenadas: [-26.183141264229178, -58.164822977685276],
        info: "Belgrano",
      },
      {
        nombre: "Aguas de Formosa",
        coordenadas: [-26.1877650910549, -58.16740985469819],
        info: "Fotheringham",
      },
      {
        nombre: "Hospital Central",
        coordenadas: [-26.18584414321449, -58.17561249718432],
        info: "Fotheringham",
      },
    ],
    recorrido: [
      [-26.185857003728707, -58.175619041241546],
      [-26.186193348860563, -58.176668519756745],
      [-26.19019578139661, -58.17509430198395],
      [-26.189104156237526, -58.17141959209586],
      [-26.186447069620215, -58.16347354047927],
      [-26.181132722731334, -58.16564742778513],
      [-26.17025916502528, -58.16972890048402],
      [-26.16643422796912, -58.17126322247208],
      [-26.16501741147217, -58.171868101361625],
      [-26.165514302686084, -58.173590484919615],
      [-26.165521121557823, -58.173633514700725],
      [-26.167315433211392, -58.17898520646865],
      [-26.16690136374202, -58.181076672216875],
      [-26.166266454366095, -58.181291970162306],
      [-26.166432083232877, -58.181814836598974],
      [-26.161007682289345, -58.183921654852114],
      [-26.157860547244013, -58.18512117197264],
      [-26.157612085598892, -58.18539798361553],
      [-26.157363623423215, -58.185736308957445],
      [-26.15697712565447, -58.185859336354724],
      [-26.15661823372254, -58.18570555210833],
      [-26.156038482884377, -58.18576706580657],
      [-26.153816071180408, -58.18666156075594],
      [-26.150475482318086, -58.18804561897123],
      [-26.144787971854143, -58.19064767593433],
      [-26.143370994464334, -58.19145075856204],
      [-26.141183346471344, -58.193361541366926],
      [-26.138622684591738, -58.19627603495479],
      [-26.130261116990845, -58.20755901952289],
      [-26.121982470818814, -58.21865790056911],
      [-26.117407413248507, -58.22477794404479],
      [-26.120565216700122, -58.22763027199895],
      [-26.12195760685971, -58.231784147661116],
      [-26.112566758384865, -58.235587891754875],
      [-26.112256273140993, -58.23489633569859],
      [-26.1116353001783, -58.23394999583216],
      [-26.11116139753944, -58.23318564440467],
      [-26.114534100925468, -58.22874662427371],
      [-26.114230312810456, -58.227762405098616],
      [-26.11064002983104, -58.21647464142636],
    ],
  },
];

let map = L.map("mapa").setView([-26.173486, -58.197993], 13);

// Añadir el mapa base de Leaflet
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let markers = [];
let polyline = null;

// Función para mostrar u ocultar las paradas
function toggleParadas() {
  let checkbox = document.getElementById("toggle-paradas");
  if (checkbox.checked) {
    markers.forEach((marker) => marker.addTo(map));
  } else {
    markers.forEach((marker) => marker.remove());
  }
}

// Función para mostrar una línea específica
function mostrarLinea(linea) {
  if (polyline) {
    map.removeLayer(polyline);
  }
  polyline = L.polyline(linea.recorrido, { color: "red" }).addTo(map);
  map.fitBounds(polyline.getBounds());

  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];

  linea.paradas.forEach((parada) => {
    let contenidoPopup = `
  <div class="container" style="padding: 10px; display: flex; align-items: center;">
    <button class="favoritoBtn" style="background: none; border: none; cursor: pointer;">
      <img src="./assets/img/icono-favorito.png" alt="Estrella-favorito" style="width: 30px; height: 30px;">
    </button>
    <div style="flex: 1; text-align: center;">
      <div style="font-weight: bold;">${parada.nombre}</div>
      <div style="text-align: left;">${parada.info ? parada.info : ""}</div>
    </div>
    <button class="colectivoBtn" style="background: none; border: none; cursor: pointer;">
      <img src="./assets/img/icono-colectivo.png" alt="Colectivo" style="width: 30px; height: 30px;">
    </button>
  </div>
`;

    let marker = L.marker(parada.coordenadas).bindPopup(contenidoPopup);
    if (document.getElementById("toggle-paradas").checked) {
      marker.addTo(map);
    }
    markers.push(marker);
  });

  // Añadir evento de clic a los botones de favorito y colectivo
  map.on("popupopen", function (e) {
    let popup = e.popup;
    let favoritoBtn = popup.getElement().querySelector(".favoritoBtn");
    if (favoritoBtn) {
      favoritoBtn.addEventListener("click", function () {
        alert("Parada agregada a favoritos!");

        // Obtener la información de la parada
        let paradaInfo = {
          nombre: popup.getElement().querySelector("div > div:first-child")
            .innerText,
          info: popup.getElement().querySelector("div > div:nth-child(2)")
            .innerText,
        };

        // Guardar la información en localStorage
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        favoritos.push(paradaInfo);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        popup._close();
      });
    }

    let colectivoBtn = popup.getElement().querySelector(".colectivoBtn");
    if (colectivoBtn) {
      colectivoBtn.addEventListener("click", function () {
        alert("Recorrido en tiempo real");
        popup._close();
      });
    }
  });
}

// Mostrar la lista de líneas de autobús
function mostrarListaLineas() {
  let listaLineas = document.getElementById("lista-lineas");
  listaLineas.innerHTML = "";
  lineas.forEach((linea, index) => {
    let item = document.createElement("div");
    item.className = "linea-item";
    item.textContent = linea.nombre;
    item.addEventListener("click", () => mostrarLinea(linea));
    listaLineas.appendChild(item);
  });
}

function toggleLineas() {
  let listaLineas = document.getElementById("lista-lineas");
  if (listaLineas.style.display === "none") {
    listaLineas.style.display = "block";
  } else {
    listaLineas.style.display = "none";
  }
}

// Event listener para el checkbox de paradas
document
  .getElementById("toggle-paradas")
  .addEventListener("change", toggleParadas);

mostrarListaLineas();

// Inicializar el mapa con Leaflet
const mapa = L.map("mapa").setView([-26.1849, -58.1731], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mapa);

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const MapPage = function () {
  const [map, setMap] = useState(null);
  const [lines, setLines] = useState([]);
  const [stops, setStops] = useState([]);
  const [activeLine, setActiveLine] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStops, setFilteredStops] = useState([]);
  const [favorites, setFavorites] = useState({});

  const customIcon = L.icon({
    iconUrl: "./public/assets/img/autobus.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowSize: [41, 41],
  });

  const fetchLines = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/lineas");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLines(data);
    } catch (error) {
      console.error("Error fetching lines:", error);
    }
  };

  const fetchStopsAndRoute = async (line) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/lineas/${line._id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setStops(data.paradas);
      setFilteredStops(data.paradas);

      if (polyline) {
        map.removeLayer(polyline);
      }

      const newPolyline = L.polyline(
        data.recorrido.map((coord) => [coord.lat, coord.lng]),
        { color: "#DC001A" }
      ).addTo(map);

      setPolyline(newPolyline);

      // Zoom y centra el mapa en la ruta
      const bounds = newPolyline.getBounds();
      map.fitBounds(bounds, { padding: [40, 40] });
    } catch (error) {
      console.error("Error fetching stops and route:", error);
    }
  };

  const createCustomPopup = (stop) => {
    const popupContent = `
      <div class="custom-popup">
        <div class="popup-header">
          <h3>${stop.nombre}</h3>
          <div class="popup-subtitle">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            Parada
          </div>
        </div>
        <div class="popup-content">
          <p>${stop.info}</p>
          <div class="popup-footer">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="2"></circle></svg>
            Próximos buses: No disponible
          </div>
        </div>
      </div>
    `;

    return L.popup({
      maxWidth: 250,
      className: "custom-popup-wrapper",
    }).setContent(popupContent);
  };

  const toggleStopOnMap = (stop) => {
    const existingMarker = markers.find(
      (marker) => marker.options.id === stop.nombre
    );

    if (existingMarker) {
      map.removeLayer(existingMarker);
      setMarkers((prevMarkers) =>
        prevMarkers.filter((marker) => marker.options.id !== stop.nombre)
      );
    } else {
      const newMarker = L.marker(stop.coordenadas, {
        icon: customIcon,
        id: stop.nombre,
      })
        .addTo(map)
        .bindPopup(createCustomPopup(stop))
        .openPopup();

      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

      // Zoom y centra el mapa en la parada seleccionada
      map.setView(stop.coordenadas, 16);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const filtered = stops.filter((stop) =>
        stop.nombre.toLowerCase().includes(term)
      );
      setFilteredStops(filtered);
    } else {
      setFilteredStops(stops);
    }
  };

  const toggleFavorite = (stopName) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [stopName]: !prevFavorites[stopName],
    }));
  };

  useEffect(() => {
    const mapInstance = L.map("mapa").setView([-26.1849, -58.1731], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    fetchLines();

    return () => {
      mapInstance.off();
      mapInstance.remove();
      markers.forEach((marker) => mapInstance.removeLayer(marker));
    };
  }, []);

  const toggleLine = (line) => {
    if (activeLine === line._id) {
      setActiveLine(null);
      setStops([]);
      setFilteredStops([]);
      if (polyline) {
        map.removeLayer(polyline);
        setPolyline(null);
      }
      markers.forEach((marker) => map.removeLayer(marker));
      setMarkers([]);
    } else {
      setActiveLine(line._id);
      fetchStopsAndRoute(line);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <main className="flex-1 flex">
        <div id="mapa" className="flex-1 bg-white relative z-40">
          {map ? null : (
            <div className="h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
              Cargando mapa...
            </div>
          )}
        </div>

        <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto shadow-lg">
          <div className="p-4 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-[#63997a]">Líneas</h2>
              <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
                {lines.map((line) => (
                  <button
                    key={line._id}
                    onClick={() => toggleLine(line)}
                    className={`w-full p-3 rounded-md flex items-center justify-between transition-colors duration-300 ${
                      activeLine === line._id
                        ? "bg-[#63997a] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="font-medium">{line.nombre}</span>
                    <span>{activeLine === line._id ? "✓" : ""}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-[#63997a]">Paradas</h2>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Buscar parada..."
                className="w-full p-2 bg-gray-700 border border-gray-300 rounded-md"
              />
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2 space-y-3">
                {filteredStops.length > 0 ? (
                  filteredStops.map((stop) => (
                    <div
                      key={stop.nombre}
                      className="p-3 bg-gray-50 rounded-md shadow-sm border border-gray-200 cursor-pointer flex justify-between items-center"
                    >
                      <div onClick={() => toggleStopOnMap(stop)}>
                        <h3 className="font-semibold text-[#63997a] mb-1">
                          {stop.nombre}
                        </h3>
                        <p className="text-sm text-gray-700">{stop.info}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(stop.nombre)}
                        className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={favorites[stop.nombre] ? "black" : "none"}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">
                    No se encontraron paradas.
                  </p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

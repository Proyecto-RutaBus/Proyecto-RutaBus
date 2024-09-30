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
        { color: "#63997a" }
      ).addTo(map);

      setPolyline(newPolyline);
    } catch (error) {
      console.error("Error fetching stops and route:", error);
    }
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
      const newMarker = L.marker(stop.coordenadas, { id: stop.nombre })
        .addTo(map)
        .bindPopup(stop.nombre)
        .openPopup();

      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
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
      setFilteredStops([]); // Limpiar las paradas filtradas
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
      <header className="bg-[#63997a] text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Mapa Interactivo</h1>
      </header>

      <main className="flex-1 flex">
        <div id="mapa" className="flex-1 bg-white relative">
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2 space-y-3">
                {filteredStops.length > 0 ? (
                  filteredStops.map((stop) => (
                    <div
                      key={stop.nombre}
                      onClick={() => toggleStopOnMap(stop)} // Cambiado de showStopOnMap a toggleStopOnMap
                      className="p-3 bg-gray-50 rounded-md shadow-sm border border-gray-200 cursor-pointer"
                    >
                      <h3 className="font-semibold text-[#63997a] mb-1">
                        {stop.nombre}
                      </h3>
                      <p className="text-sm text-gray-700">{stop.info}</p>
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

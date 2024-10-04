"use client";
import { useEffect, useState } from "react";
import { Map as MapIcon, Bus, Star, MapPin, Search, Menu } from "lucide-react";
import L from "leaflet";
import Header from "../components/Header";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [lines, setLines] = useState([]);
  const [stops, setStops] = useState([]);
  const [activeLine, setActiveLine] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStops, setFilteredStops] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState("líneas");
  const [showAllStops, setShowAllStops] = useState(false);

  const customIcon = L.icon({
    iconUrl: "./assets/img/autobus.png",
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
        { color: "#fa7f4b", weight: 5 }
      ).addTo(map);

      setPolyline(newPolyline);

      const bounds = newPolyline.getBounds();
      map.fitBounds(bounds, { padding: [50, 50] });

      addStopMarkers(data.paradas);
    } catch (error) {
      console.error("Error fetching stops and route:", error);
    }
  };

  const addStopMarkers = (stopsData) => {
    markers.forEach((marker) => map.removeLayer(marker));
    setMarkers([]);

    const newMarkers = stopsData.map((stop) => {
      const marker = L.marker([stop.coordenadas.lat, stop.coordenadas.lng], {
        icon: customIcon,
      })
        .addTo(map)
        .bindPopup(`<b>${stop.nombre}</b>`);
      return marker;
    });

    setMarkers(newMarkers);
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

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchQuery.toLowerCase();
    if (term) {
      const filtered = stops.filter((stop) =>
        stop.nombre.toLowerCase().includes(term)
      );
      setFilteredStops(filtered);
    } else {
      setFilteredStops(stops);
    }
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const toggleLineSelection = (line) => {
    if (activeLine && activeLine._id === line._id) {
      setActiveLine(null);
      setStops([]);
      if (polyline) {
        map.removeLayer(polyline);
        setPolyline(null);
      }
      markers.forEach((marker) => map.removeLayer(marker));
      setMarkers([]);
    } else {
      setActiveLine(line);
      fetchStopsAndRoute(line);
    }
  };

  const toggleFavorite = (stopName) => {
    setFavorites((prev) => ({
      ...prev,
      [stopName]: !prev[stopName],
    }));
  };

  const handleStopClick = (stop) => {
    map.setView([stop.coordenadas.lat, stop.coordenadas.lng], 16);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      <header className="bg-[#63997a] text-white p-4 flex justify-between items-center z-50">
        <h1 className="text-2xl font-bold">Mapa Interactivo</h1>
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-[#fa7f4b] transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 relative">
          <div className="absolute top-4 left-4 right-4 z-50">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#63997a]"
              />
              <button
                type="submit"
                className="bg-[#fa7f4b] text-white px-4 py-2 rounded-r-md hover:bg-[#e86f3a] transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
          <div id="mapa" className="h-full w-full"></div>
        </div>

        {showSidebar && (
          <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto flex flex-col">
            <nav className="p-4 bg-[#63997a] text-white">
              <ul className="flex justify-around">
                {["Líneas", "Paradas", "Favoritos"].map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        activeTab === tab.toLowerCase()
                          ? "bg-[#fa7f4b] text-white"
                          : "hover:bg-[#5a8a6e]"
                      }`}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {activeTab === "líneas" && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Filtrar líneas..."
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#63997a]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      {lines.map((line) => (
                        <button
                          key={line._id}
                          onClick={() => toggleLineSelection(line)}
                          className={`p-2 rounded-md text-center transition-colors ${
                            activeLine && activeLine._id === line._id
                              ? "bg-[#fa7f4b] text-white"
                              : "bg-gray-100 hover:bg-[#fa7f4b] hover:text-white"
                          }`}
                        >
                          {line.nombre}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "paradas" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="show-all-stops"
                        checked={showAllStops}
                        onChange={() => setShowAllStops(!showAllStops)}
                        className="rounded text-[#fa7f4b] focus:ring-[#63997a]"
                      />
                      <label
                        htmlFor="show-all-stops"
                        className="text-sm text-gray-600"
                      >
                        Mostrar todas las paradas
                      </label>
                    </div>
                    <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                      {filteredStops.map((stop) => (
                        <div
                          key={stop._id}
                          className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                          onClick={() => handleStopClick(stop)}
                        >
                          <h3 className="font-semibold text-[#63997a]">
                            {stop.nombre}
                          </h3>
                          <p className="text-sm text-gray-600">{stop.info}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(stop.nombre);
                            }}
                            className="mt-1 text-[#fa7f4b] hover:text-[#e86f3a]"
                          >
                            <Star
                              size={16}
                              fill={favorites[stop.nombre] ? "#fa7f4b" : "none"}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "favoritos" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#63997a]">
                      Favoritos
                    </h2>
                    <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                      {Object.entries(favorites)
                        .filter(([_, isFavorite]) => isFavorite)
                        .map(([stopName]) => (
                          <div
                            key={stopName}
                            className="p-2 bg-gray-100 rounded-md flex justify-between items-center"
                          >
                            <span className="text-[#63997a]">{stopName}</span>
                            <button
                              onClick={() => toggleFavorite(stopName)}
                              className="text-[#fa7f4b] hover:text-[#e86f3a]"
                            >
                              <Star size={16} fill="#fa7f4b" />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <footer className="p-4 bg-gray-100 mt-auto">
              <button className="w-full bg-[#63997a] text-white px-4 py-2 rounded-md hover:bg-[#5a8a6e] transition-colors flex items-center justify-center">
                <Bus size={20} className="mr-2" />
                Planificar Ruta
              </button>
            </footer>
          </aside>
        )}
      </main>
    </div>
  );
}

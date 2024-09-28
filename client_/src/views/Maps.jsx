"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const MapPage = function () {
  const [showLines, setShowLines] = useState(false);
  const [showStops, setShowStops] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllStops, setShowAllStops] = useState(false);
  const [activeLines, setActiveLines] = useState({});
  const [map, setMap] = useState(null);

  const lines = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
  ];

  const toggleLines = () => setShowLines(!showLines);
  const toggleStops = () => setShowStops(!showStops);
  const toggleFavorites = () => setShowFavorites(!showFavorites);
  const toggleAllStops = () => setShowAllStops(!showAllStops);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search logic here
  };

  const toggleLine = (line) => {
    setActiveLines((prev) => ({ ...prev, [line]: !prev[line] }));
  };

  useEffect(() => {
    const mapInstance = L.map("mapa").setView([-26.1849, -58.1731], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.off();
      mapInstance.remove();
    };
  }, []);

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
          <div className="p-4 space-y-4">
            {[
              {
                title: "Líneas",
                state: showLines,
                toggle: toggleLines,
                content: lines,
              },
              { title: "Paradas", state: showStops, toggle: toggleStops },
              {
                title: "Favoritos",
                state: showFavorites,
                toggle: toggleFavorites,
              },
            ].map((section) => (
              <div key={section.title} className="space-y-2">
                <button
                  className="w-full px-4 py-2 text-left bg-[#63997a] text-white rounded-md hover:bg-[#528c6d] transition-colors duration-300 flex justify-between items-center font-semibold"
                  onClick={section.toggle}
                >
                  <span>{section.title}</span>
                  <span>{section.state ? "−" : "+"}</span>
                </button>
                {section.state && (
                  <div className="mt-2 space-y-2 pl-2">
                    {section.title === "Líneas" && (
                      <div className="max-h-60 overflow-y-auto pr-2">
                        {section.content.map((line) => (
                          <button
                            key={line}
                            onClick={() => toggleLine(line)}
                            className={`w-full p-2 mb-1 rounded-md flex items-center justify-between transition-colors duration-300 ${
                              activeLines[line]
                                ? "bg-[#fa7f4b] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            <span>Línea {line}</span>
                            <span>{activeLines[line] ? "✓" : ""}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {section.title === "Paradas" && (
                      <>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="show-all-stops"
                            checked={showAllStops}
                            onChange={toggleAllStops}
                            className="rounded text-[#63997a] focus:ring-[#63997a]"
                          />
                          <label
                            htmlFor="show-all-stops"
                            className="text-gray-700"
                          >
                            Mostrar todas las paradas
                          </label>
                        </div>
                        <input
                          type="text"
                          placeholder="Buscar parada..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#63997a] focus:border-transparent"
                        />
                      </>
                    )}
                    {section.title === "Favoritos" && (
                      <>
                        <button className="w-full px-4 py-2 bg-[#63997a] text-white rounded-md hover:bg-[#528c6d] transition-colors duration-300">
                          Añadir ubicación actual
                        </button>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {["Casa", "Trabajo", "Gimnasio"].map((fav) => (
                            <div
                              key={fav}
                              className="flex items-center justify-between bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
                            >
                              <span className="text-gray-700">{fav}</span>
                              <button className="text-[#fa7f4b] font-semibold hover:text-[#e86f3b] transition-colors duration-300">
                                Favorito
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button className="w-full px-4 py-2 bg-[#fa7f4b] text-white rounded-md hover:bg-[#e86f3b] transition-colors duration-300 font-semibold">
              Planificar Ruta
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

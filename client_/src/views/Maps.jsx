import { useState } from "react";

export const MapPage = function () {
  const [showLines, setShowLines] = useState(false);
  const [showStops, setShowStops] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllStops, setShowAllStops] = useState(false);
  const [activeLines, setActiveLines] = useState({
    A: false,
    B: false,
    C: false,
  });

  const lines = ["A", "B", "C"];

  const toggleLines = () => setShowLines(!showLines);
  const toggleStops = () => setShowStops(!showStops);
  const toggleFavorites = () => setShowFavorites(!showFavorites);
  const toggleAllStops = () => setShowAllStops(!showAllStops);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implementar lógica de búsqueda aquí
  };

  const toggleLine = (line) => {
    setActiveLines((prev) => ({ ...prev, [line]: !prev[line] }));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-green-500 text-black p-4">
        <h1 className="text-2xl font-bold">Mapa de Transporte</h1>
      </header>

      <main className="flex-1 flex">
        <div id="mapa" className="flex-1 bg-white relative">
          {/* Aquí se renderizará el mapa */}
          <div className="h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
            MAPA
          </div>
          <div className="absolute top-4 left-4 right-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>

        <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4 space-y-4">
            <div>
              <button
                className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-md flex justify-between items-center text-black"
                onClick={toggleLines}
              >
                <span>Líneas</span>
                <span>{showLines ? "-" : "+"}</span>
              </button>
              {showLines && (
                <div className="mt-2 space-y-2">
                  <div className="space-y-2">
                    {lines.map((line) => (
                      <div key={line} className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleLine(line)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            activeLines[line]
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {line}
                        </button>
                        <span className="text-black">Línea {line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-md flex justify-between items-center text-black"
                onClick={toggleStops}
              >
                <span>Paradas</span>
                <span>{showStops ? "-" : "+"}</span>
              </button>
              {showStops && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="show-all-stops"
                      checked={showAllStops}
                      onChange={toggleAllStops}
                      className="rounded"
                    />
                    <label htmlFor="show-all-stops" className="text-black">
                      Mostrar todas las paradas
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar parada..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>

            <div>
              <button
                className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-md flex justify-between items-center text-black"
                onClick={toggleFavorites}
              >
                <span>Favoritos</span>
                <span>{showFavorites ? "-" : "+"}</span>
              </button>
              {showFavorites && (
                <div className="mt-2 space-y-2">
                  <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md">
                    Añadir ubicación actual
                  </button>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {["Casa", "Trabajo", "Gimnasio"].map((fav) => (
                      <div
                        key={fav}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                      >
                        <span className="text-black">{fav}</span>
                        <button className="text-green-500 font-bold">
                          Favorito
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md">
              Planificar Ruta
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.js";
import "leaflet-control-geocoder";

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
  const [activeTab, setActiveTab] = useState("lines");

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

      const bounds = newPolyline.getBounds();
      map.fitBounds(bounds, { padding: [40, 40] });
    } catch (error) {
      console.error("Error fetching stops and route:", error);
    }
  };

  const createCustomPopup = (stop, isFavorite, toggleFavorite) => {
    const popupContent = (
      <PopupContent
        stop={stop}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    );

    return L.popup({
      maxWidth: 250,
      className: "custom-popup-wrapper",
    }).setContent(ReactDOMServer.renderToString(popupContent));
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
        stop: stop, // Pasar la parada completa
      })
        .addTo(map)
        .bindPopup(
          createCustomPopup(stop, favorites[stop.nombre], toggleFavorite)
        )
        .openPopup();

      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      map.setView(stop.coordenadas, 16);
    }
  };

  const handleSearch = async (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      // Filtrar paradas
      const filtered = stops.filter((stop) =>
        stop.nombre.toLowerCase().includes(term)
      );
      setFilteredStops(filtered);

      // Geocodificación
      try {
        const provider = new L.Control.Geocoder.Nominatim();
        const results = await new Promise((resolve) => {
          provider.geocode(term, (results) => {
            resolve(results);
          });
        });
        if (results && results.length > 0) {
          const { center, name } = results[0];
          map.setView(center, 16);
          L.marker(center).addTo(map).bindPopup(name).openPopup();
        }
      } catch (error) {
        console.error("Error en la geocodificación:", error);
      }
    } else {
      setFilteredStops(stops);
    }
  };

  const toggleFavorite = (stopName) => {
    setFavorites((prevFavorites) => {
      const newFavorites = {
        ...prevFavorites,
        [stopName]: !prevFavorites[stopName],
      };

      // Actualizar el contenido del popup para reflejar el cambio en favoritos
      markers.forEach((marker) => {
        if (marker.options.id === stopName) {
          marker.setPopupContent(
            ReactDOMServer.renderToString(
              createCustomPopup(
                marker.options.stop,
                newFavorites[stopName],
                toggleFavorite
              )
            )
          );
        }
      });

      return newFavorites;
    });
  };

  useEffect(() => {
    const mapInstance = L.map("mapa").setView([-26.1849, -58.1731], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    const locateControl = L.control
      .locate({
        position: "topright",
        strings: {
          title: "Mostrar mi ubicación",
        },
        drawCircle: true,
        showPopup: true,
        initialZoomLevel: 16,
        locateOptions: {
          maxZoom: 16,
          enableHighAccuracy: true,
        },
        flyTo: true,
      })
      .addTo(mapInstance);

    mapInstance.on("locationerror", function (e) {
      alert(
        "No se pudo obtener su ubicación. Por favor, habilite la geolocalización en su navegador."
      );
    });

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
            <div className="w-full h-full flex justify-center items-center">
              Cargando mapa...
            </div>
          )}
        </div>
        <aside className="w-96 bg-white border-l border-gray-200 overflow-y-auto shadow-lg">
          <div className="p-6 space-y-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Buscar ubicación..."
                className="w-full p-3 pr-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2 text-black ">
                Controles del Mapa
              </h2>
              <p className="text-sm text-black mb-4">
                Gestiona líneas, paradas y favoritos
              </p>
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === "lines"
                      ? "border-b-2 border-custom text-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("lines")}
                >
                  Líneas
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === "stops"
                      ? "border-b-2 border-custom text-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("stops")}
                >
                  Paradas
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === "favorites"
                      ? "border-b-2 border-custom text-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("favorites")}
                >
                  Favoritos
                </button>
              </div>
            </div>

            {activeTab === "lines" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                  {lines.map((line) => (
                    <button
                      key={line._id}
                      onClick={() => toggleLine(line)}
                      className={`p-3 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        activeLine === line._id
                          ? "bg-[#fa7f4b] text-white shadow-md transform scale-105"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      <span className="font-medium text-sm">{line.nombre}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "stops" && (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {filteredStops.length > 0 ? (
                  filteredStops.map((stop) => (
                    <div
                      key={stop.nombre}
                      className="p-4 bg-white  rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <div
                          className="cursor-pointer flex-grow"
                          onClick={() => toggleStopOnMap(stop)}
                        >
                          <h3 className="font-semibold text-[#63997a] mb-1">
                            {stop.nombre}
                          </h3>
                          <p className="text-sm text-gray-600">{stop.info}</p>
                        </div>
                        <button
                          onClick={() => toggleFavorite(stop.nombre)}
                          className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={favorites[stop.nombre] ? "blue" : "none"}
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
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-center">
                    No se encontraron paradas.
                  </p>
                )}
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {Object.entries(favorites).filter(
                  ([_, isFavorite]) => isFavorite
                ).length > 0 ? (
                  Object.entries(favorites)
                    .filter(([_, isFavorite]) => isFavorite)
                    .map(([stopName]) => {
                      const stop = stops.find((s) => s.nombre === stopName);
                      if (!stop) return null;
                      return (
                        <div
                          key={stop.nombre}
                          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="flex justify-between items-start">
                            <div
                              className="cursor-pointer flex-grow"
                              onClick={() => toggleStopOnMap(stop)}
                            >
                              <h3 className="font-semibold text-blue-500 mb-1">
                                {stop.nombre}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {stop.info}
                              </p>
                            </div>
                            <button
                              onClick={() => toggleFavorite(stop.nombre)}
                              className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="blue"
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
                        </div>
                      );
                    })
                ) : (
                  <p className="text-gray-500 italic text-center">
                    No hay paradas favoritas.
                  </p>
                )}
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

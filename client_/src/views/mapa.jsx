import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";

export default function MapComponent() {
  const [map, setMap] = useState(null);
  const [originMarker, setOriginMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [step, setStep] = useState("origin");
  const [routeInfo, setRouteInfo] = useState(null);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    const initialMap = L.map("map").setView([-26.1849, -58.1731], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(initialMap);

    setMap(initialMap);

    return () => {
      if (initialMap) {
        initialMap.remove();
      }
    };
  }, []);

  const onMapClick = (e) => {
    if (step === "origin") {
      if (originMarker) {
        map.removeLayer(originMarker);
      }
      const marker = L.marker(e.latlng)
        .addTo(map)
        .bindPopup("Origen")
        .openPopup();
      setOriginMarker(marker);
      setStep("destination");
    } else if (step === "destination") {
      if (destinationMarker) {
        map.removeLayer(destinationMarker);
      }
      const marker = L.marker(e.latlng)
        .addTo(map)
        .bindPopup("Destino")
        .openPopup();
      setDestinationMarker(marker);

      const control = L.Routing.control({
        waypoints: [originMarker.getLatLng(), marker.getLatLng()],
        routeWhileDragging: true,
        language: "es",
        showAlternatives: true,
        lineOptions: {
          styles: [{ color: "#6366f1", weight: 6 }],
        },
        show: false, // Oculta las indicaciones en el mapa
        addWaypoints: false, // Impide que se añadan más waypoints
      }).addTo(map);

      control.on("routesfound", function (e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        setRouteInfo({
          distance: (summary.totalDistance / 1000).toFixed(2),
          time: Math.round(summary.totalTime / 60),
        });
        setInstructions(routes[0].instructions);
      });

      setRoutingControl(control);
      setStep("complete");
    }
  };

  const resetRoute = () => {
    if (originMarker) {
      map.removeLayer(originMarker);
      setOriginMarker(null);
    }
    if (destinationMarker) {
      map.removeLayer(destinationMarker);
      setDestinationMarker(null);
    }
    if (routingControl) {
      map.removeControl(routingControl);
      setRoutingControl(null);
    }
    setStep("origin");
    setRouteInfo(null);
    setInstructions([]);
  };

  useEffect(() => {
    if (map) {
      map.on("click", onMapClick);
    }

    return () => {
      if (map) {
        map.off("click", onMapClick);
      }
    };
  }, [map, step, originMarker, destinationMarker, routingControl]);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-1/4 bg-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">
          Planificador de Ruta
        </h1>

        {step !== "complete" && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-r-lg">
            <p className="font-bold">
              {step === "origin" ? "Marque el origen" : "Marque el destino"}
            </p>
            <p>
              {step === "origin"
                ? "Haga clic en el mapa para marcar el punto de partida de su ruta."
                : "Ahora, haga clic en el mapa para marcar el punto de llegada de su ruta."}
            </p>
          </div>
        )}

        {routeInfo && (
          <div className="bg-white border-l-4 border-indigo-500 p-4 mb-6 rounded-r-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">
              Información de la Ruta
            </h2>
            <p>
              <span className="font-bold">Distancia:</span> {routeInfo.distance}{" "}
              km
            </p>
            <p>
              <span className="font-bold">Tiempo estimado:</span>{" "}
              {routeInfo.time} minutos
            </p>
          </div>
        )}

        {instructions.length > 0 && (
          <div className="bg-white border-l-4 border-indigo-500 p-4 mb-6 rounded-r-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">
              Indicaciones
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              {instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">
                  {instruction.text}
                </li>
              ))}
            </ol>
          </div>
        )}

        {step === "complete" && (
          <button
            onClick={resetRoute}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Reiniciar ruta
          </button>
        )}
      </aside>

      <main className="flex-1">
        <div id="map" className="h-full w-full"></div>
      </main>
    </div>
  );
}

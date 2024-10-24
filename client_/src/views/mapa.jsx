import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";

export default function MapComponent() {
  const [map, setMap] = useState(null);
  const [originMarker, setOriginMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [step, setStep] = useState("origin");
  const [routeOptions, setRouteOptions] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [originAddress, setOriginAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

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

  // Función para hacer geocoding inverso (coordenadas -> dirección)
  const getAddress = (lat, lng, callback) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.address) {
          const address = `${data.address.road || ""} ${
            data.address.house_number || ""
          }, ${data.address.city || data.address.town || ""}`.trim();
          callback(address || "Dirección no disponible");
        } else {
          callback("Dirección no disponible");
        }
      })
      .catch((error) => {
        console.error("Error al obtener la dirección:", error);
        callback("Error al obtener la dirección");
      });
  };

  const onMapClick = (e) => {
    if (step === "origin") {
      if (originMarker) {
        map.removeLayer(originMarker);
      }
      const marker = L.marker(e.latlng, { draggable: false })
        .addTo(map)
        .bindPopup("Origen")
        .openPopup();
      setOriginMarker(marker);
      setStep("destination");
    } else if (step === "destination") {
      if (destinationMarker) {
        map.removeLayer(destinationMarker);
      }
      const marker = L.marker(e.latlng, { draggable: false })
        .addTo(map)
        .bindPopup("Destino")
        .openPopup();
      setDestinationMarker(marker);

      if (routingControl) {
        map.removeControl(routingControl);
      }

      const control = L.Routing.control({
        waypoints: [originMarker.getLatLng(), marker.getLatLng()],
        routeWhileDragging: false,
        language: "es",
        showAlternatives: true,
        lineOptions: {
          styles: [{ color: "#FF8C00", opacity: 0.8, weight: 6 }],
        },
        altLineOptions: {
          styles: [{ color: "#4B4B4B", opacity: 0.6, weight: 6 }],
        },
        createMarker: function () {
          return null;
        }, // Desactiva los marcadores de los waypoints
        addWaypoints: false,
        draggableWaypoints: false,
        show: false, // Evita que las instrucciones se muestren en el mapa
      }).addTo(map);

      // Escuchar cuando se encuentran rutas
      control.on("routesfound", function (e) {
        const routes = e.routes;
        setRouteOptions(routes);
        setSelectedRoute(routes[0]); // Seleccionar la primera ruta por defecto
        updateRouteInfo(routes[0]); // Mostrar la primera ruta al encontrar las rutas
      });

      // Escuchar cuando se selecciona una ruta
      control.on("routeselected", function (e) {
        const selectedIndex = e.routeIndex;
        const selectedRoute = e.route;
        setSelectedRoute(selectedRoute); // Guardar la ruta seleccionada
        updateRouteInfo(selectedRoute); // Actualizar la información mostrada
      });

      setRoutingControl(control);
      setStep("complete");

      // Obtener direcciones del origen y destino
      getAddress(
        originMarker.getLatLng().lat,
        originMarker.getLatLng().lng,
        setOriginAddress
      );
      getAddress(
        marker.getLatLng().lat,
        marker.getLatLng().lng,
        setDestinationAddress
      );
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
    setRouteOptions([]);
    setSelectedRoute(null);
    setInstructions([]);
    setOriginAddress(""); // Resetear dirección de origen
    setDestinationAddress(""); // Resetear dirección de destino
  };

  // Función para actualizar la información de la ruta seleccionada
  const updateRouteInfo = (route) => {
    setInstructions(
      route.instructions || route.segments.map((seg) => seg.instructions)
    );
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
        <h1 className="text-2xl font-bold mb-6 text-blue-700">
          Planificador de Ruta
        </h1>

        {step !== "complete" && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
            <h2 className="font-bold">
              {step === "origin" ? "Marque el origen" : "Marque el destino"}
            </h2>
            <p>
              {step === "origin"
                ? "Haga clic en el mapa para marcar el punto de partida de su ruta."
                : "Ahora, haga clic en el mapa para marcar el punto de llegada de su ruta."}
            </p>
          </div>
        )}

        {originAddress && (
          <div className="bg-white border-l-4 border-blue-500 p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-700">
              Dirección de Origen
            </h2>
            <p>{originAddress}</p>
          </div>
        )}

        {destinationAddress && (
          <div className="bg-white border-l-4 border-blue-500 p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-700">
              Dirección de Destino
            </h2>
            <p>{destinationAddress}</p>
          </div>
        )}

        {selectedRoute && (
          <div className="bg-white border-l-4 border-orange-500 p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2 text-orange-700">
              Información de la Ruta
            </h2>
            <p>
              <span className="font-bold">Distancia:</span>{" "}
              {(selectedRoute.summary.totalDistance / 1000).toFixed(2)} km
            </p>
            <p>
              <span className="font-bold">Tiempo estimado:</span>{" "}
              {Math.round(selectedRoute.summary.totalTime / 60)} minutos
            </p>
          </div>
        )}

        {instructions.length > 0 && (
          <div className="bg-white border-l-4 border-green-500 p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2 text-green-700">
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
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

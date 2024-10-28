import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import Header from "../components/Header";

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
  const [recommendedLine, setRecommendedLine] = useState(null);
  const [boardingStop, setBoardingStop] = useState(null);
  const [alightingStop, setAlightingStop] = useState(null);

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

  const fetchLinesData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/lineas");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener las líneas de colectivos:", error);
      return [];
    }
  };

  const findClosestLineAndStops = (origin, destination, lines) => {
    let closestLine = null;
    let minDistance = Infinity;
    let boardingStop = null;
    let alightingStop = null;

    lines.forEach((line) => {
      line.paradas.forEach((stop) => {
        const stopLatLng = L.latLng(stop.coordenadas[0], stop.coordenadas[1]);
        const distanceToOrigin = origin.distanceTo(stopLatLng);
        const distanceToDestination = destination.distanceTo(stopLatLng);
        const totalDistance = distanceToOrigin + distanceToDestination;

        if (totalDistance < minDistance) {
          minDistance = totalDistance;
          closestLine = line.nombre;
          boardingStop =
            distanceToOrigin < distanceToDestination ? stop : boardingStop;
          alightingStop =
            distanceToDestination < distanceToOrigin ? stop : alightingStop;
        }
      });
    });

    return { closestLine, boardingStop, alightingStop };
  };

  const onMapClick = async (e) => {
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
          styles: [{ color: "#3B82F6", opacity: 0.8, weight: 6 }],
        },
        altLineOptions: {
          styles: [{ color: "#9CA3AF", opacity: 0.6, weight: 6 }],
        },
        createMarker: function () {
          return null;
        },
        addWaypoints: false,
        draggableWaypoints: false,
      }).addTo(map);

      control.on("routesfound", function (e) {
        const routes = e.routes;
        setRouteOptions(routes);
        setSelectedRoute(routes[0]);
        updateRouteInfo(routes[0]);
      });

      control.on("routeselected", function (e) {
        const selectedRoute = e.route;
        setSelectedRoute(selectedRoute);
        updateRouteInfo(selectedRoute);
      });

      setRoutingControl(control);
      setStep("complete");

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

      const lines = await fetchLinesData();

      const { closestLine, boardingStop, alightingStop } =
        findClosestLineAndStops(
          originMarker.getLatLng(),
          marker.getLatLng(),
          lines
        );

      setRecommendedLine(closestLine);
      setBoardingStop(boardingStop);
      setAlightingStop(alightingStop);
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
    setOriginAddress("");
    setDestinationAddress("");
    setRecommendedLine(null);
    setBoardingStop(null);
    setAlightingStop(null);
  };

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
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 bg-white p-6 overflow-y-auto shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-[#fa7f4b]">
            Planificador de Ruta
          </h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Instrucciones
            </h2>
            {step === "origin" && (
              <div
                className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
                role="alert"
              >
                <p className="font-bold">Atención</p>
                <p>Haga clic en el mapa para seleccionar el punto de origen.</p>
              </div>
            )}
            {step === "destination" && (
              <div
                className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
                role="alert"
              >
                <p className="font-bold">Atención</p>
                <p>
                  Ahora, haga clic en el mapa para seleccionar el punto de
                  destino.
                </p>
              </div>
            )}
            {step === "complete" && (
              <div
                className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
                role="alert"
              >
                <p className="font-bold">Completado</p>
                <p>
                  Ruta calculada. Puede reiniciar para planificar una nueva
                  ruta.
                </p>
              </div>
            )}
          </div>
          {selectedRoute && (
            <div className="bg-blue-50 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-black-800">
                Ruta Recomendada
              </h2>
              <div className="space-y-2">
                <div className="bg-[#fa7f4b] p-3 rounded-md mt-4">
                  <p className="font-bold text-black">
                    Línea Recomendada:{" "}
                    <span className="font-normal">{recommendedLine}</span>
                  </p>
                </div>
                <div className="bg-green-300 p-3 rounded-md mt-2">
                  <p className="font-bold text-green-800">
                    Parada de Subida:{" "}
                    <span className="font-normal">
                      {boardingStop ? boardingStop.nombre : "N/A"}
                    </span>
                  </p>
                </div>
                <div className="bg-green-300 p-3 rounded-md mt-2">
                  <p className="font-bold text-green-800">
                    Parada de Bajada:{" "}
                    <span className="font-normal">
                      {alightingStop ? alightingStop.nombre : "N/A"}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={resetRoute}
                className="mt-6 w-full bg-[#fa7f4b] text-white py-2 px-4 rounded-md hover:bg-orange-400 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Reiniciar Ruta
              </button>
            </div>
          )}
        </aside>
        <div id="map" className="flex-1 relative z-40"></div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-control-geocoder";

const MapaPage = () => {
  const mapRef = useRef(null); // Ref para almacenar la instancia del mapa

  useEffect(() => {
    // Verifica si el mapa ya fue inicializado
    if (mapRef.current) {
      return; // Si ya existe, no inicializar de nuevo
    }

    // Inicializa el mapa
    mapRef.current = L.map("map").setView([-26.1842, -58.1975], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Control de geocodificación
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
    }).addTo(mapRef.current);

    // Manejar el resultado de la búsqueda
    geocoder.on("markgeocode", (e) => {
      const latlng = e.geocode.center;
      L.marker(latlng)
        .addTo(mapRef.current)
        .bindPopup(e.geocode.name)
        .openPopup();
      mapRef.current.setView(latlng, 13);
    });
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default MapaPage;

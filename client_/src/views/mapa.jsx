"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-control-geocoder";

// Estilos personalizados para el control de geocodificación
const customStyles = `
  .leaflet-control-geocoder {
    background: white;
    box-shadow: 0 1px 5px rgba(0,0,0,0.4);
    border-radius: 5px;
    padding: 5px;
  }
  .leaflet-control-geocoder-form input {
    width: 200px;
    border: 1px solid #ccc;
    padding: 5px;
    font-size: 14px;
  }
  .leaflet-control-geocoder-form button {
    background: #0078A8;
    border: none;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
  }
  .leaflet-control-geocoder-form button:hover {
    background: #005f86;
  }
`;

// Añadir estilos al documento
const styleElement = document.createElement("style");
styleElement.textContent = customStyles;
document.head.appendChild(styleElement);

export default function MapaPage() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    // Inicializa el mapa
    mapRef.current = L.map("map", {
      zoomControl: false, // Desactivamos el control de zoom predeterminado
    }).setView([-26.1842, -58.1975], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Estilos personalizados para el control de geocodificación
    const customStyles2 = `
      .leaflet-control-geocoder {
        border: none;
        border-radius: 8px;
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .leaflet-control-geocoder-form {
        display: flex;
        align-items: center;
      }
      .leaflet-control-geocoder-form input {
        width: 250px;
        padding: 10px 15px;
        font-size: 16px;
        border: none;
        border-radius: 8px;
        outline: none;
        background-color: #f8f9fa;
      }
      .leaflet-control-geocoder-icon {
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%234a5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>');
        background-size: 20px;
        background-position: center;
        width: 40px;
        height: 40px;
        border: none;
        background-color: #4a5568;
        border-radius: 8px;
        cursor: pointer;
      }
      .leaflet-control-geocoder-icon:hover {
        background-color: #2d3748;
      }
      .leaflet-control-geocoder-alternatives {
        background: white;
        border-radius: 0 0 8px 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .leaflet-control-geocoder-alternatives li {
        padding: 10px 15px;
        font-size: 14px;
        border-top: 1px solid #eee;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      .leaflet-control-geocoder-alternatives li:hover {
        background-color: #f0f0f0;
      }
      .custom-zoom-control {
        position: absolute;
        bottom: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        z-index: 1000;
      }
      .zoom-button {
        width: 40px;
        height: 40px;
        background-color: white;
        border: none;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }
      .zoom-button:first-child {
        border-radius: 5px 5px 0 0;
      }
      .zoom-button:last-child {
        border-radius: 0 0 5px 5px;
      }
      .zoom-button:hover {
        background-color: #f0f0f0;
      }
    `;

    // Añadir estilos al documento
    const styleElement2 = document.createElement("style");
    styleElement2.textContent = customStyles2;
    document.head.appendChild(styleElement2);

    // Control de geocodificación
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
      placeholder: "Buscar dirección...",
      errorMessage: "No se encontró la dirección.",
      suggestMinLength: 3,
      suggestTimeout: 250,
      queryMinLength: 1,
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

    // Agregar controles de zoom personalizados
    const zoomControl = L.control({ position: "bottomright" });
    zoomControl.onAdd = function () {
      const container = L.DomUtil.create("div", "custom-zoom-control");
      const zoomInButton = L.DomUtil.create("button", "zoom-button", container);
      zoomInButton.innerHTML = "+";
      const zoomOutButton = L.DomUtil.create(
        "button",
        "zoom-button",
        container
      );
      zoomOutButton.innerHTML = "−";

      L.DomEvent.on(zoomInButton, "click", function () {
        mapRef.current.zoomIn();
      });

      L.DomEvent.on(zoomOutButton, "click", function () {
        mapRef.current.zoomOut();
      });

      return container;
    };
    zoomControl.addTo(mapRef.current);

    // Limpiar al desmontar
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      document.head.removeChild(styleElement);
      document.head.removeChild(styleElement2);
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
}

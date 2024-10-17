"use client";

import React, { useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function PaginaMapa() {
  const [ubicacionInicio, setUbicacionInicio] = useState("");
  const [ubicacionDestino, setUbicacionDestino] = useState("");
  const mapaRef = useRef(null);
  const controlRutaRef = useRef(null);

  const buscarRuta = async () => {
    if (!ubicacionInicio || !ubicacionDestino) {
      alert("Por favor, ingresa ambas ubicaciones.");
      return;
    }

    try {
      const respuestaInicio = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: ubicacionInicio,
            key: "87cff1be4ac9432499e81576bd574489",
            limit: 1,
          },
        }
      );

      const respuestaDestino = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: ubicacionDestino,
            key: "87cff1be4ac9432499e81576bd574489",
            limit: 1,
          },
        }
      );

      const inicio = respuestaInicio.data.results[0].geometry;
      const destino = respuestaDestino.data.results[0].geometry;

      if (controlRutaRef.current) {
        mapaRef.current.removeControl(controlRutaRef.current);
      }

      controlRutaRef.current = L.Routing.control({
        waypoints: [
          L.latLng(inicio.lat, inicio.lng),
          L.latLng(destino.lat, destino.lng),
        ],
        language: "es",
      }).addTo(mapaRef.current);

      mapaRef.current.setView([inicio.lat, inicio.lng], 13);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      alert(
        "No se pudo encontrar las ubicaciones. Por favor intenta de nuevo."
      );
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 p-4 flex flex-col md:flex-row gap-4">
      <Card className="w-full md:w-1/3 h-auto md:h-full">
        <CardHeader>
          <CardTitle>Planificador de Ruta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Ubicación de inicio"
              value={ubicacionInicio}
              onChange={(e) => setUbicacionInicio(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Ubicación de destino"
              value={ubicacionDestino}
              onChange={(e) => setUbicacionDestino(e.target.value)}
            />
            <Button onClick={buscarRuta} className="w-full">
              Obtener Ruta
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full md:w-2/3 h-[calc(100vh-2rem)] md:h-full">
        <MapContainer
          center={[-26.1849, -58.1731]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          ref={mapaRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </Card>
    </div>
  );
}

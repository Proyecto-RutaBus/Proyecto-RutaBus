import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MapPage } from "./Maps"; // Importa el componente del mapa


export default function Home() {
    return (
        <>
            <Header />
            <div className="h-[80vh] "> {/* Asegura que el mapa tenga un espacio adecuado */}
                <MapPage />
            </div>
            
        </>
    );
}
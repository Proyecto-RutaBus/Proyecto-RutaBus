import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

const PopupContent = ({ stop, isFavorite, toggleFavorite }) => {
  const handleHeartClick = () => {
    toggleFavorite(stop.nombre);
  };

  const heartIconStyle = {
    cursor: "pointer",
    color: isFavorite ? "red" : "#ccc",
    transition: "transform 0.3s ease",
    transform: isFavorite ? "scale(1.2)" : "scale(1)",
  };

  return (
    <div className="custom-popup">
      <div
        className="popup-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>{stop.nombre}</h3>
          <div
            className="popup-subtitle"
            style={{ display: "flex", alignItems: "center" }}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Parada
          </div>
        </div>
        <button
          className="popup-heart"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: "10%",
          }}
          onClick={handleHeartClick}
        >
          <FontAwesomeIcon
            icon={isFavorite ? filledHeart : emptyHeart}
            style={heartIconStyle}
          />
        </button>
      </div>
      <div className="popup-content">
        <p>{stop.info}</p>
        <div className="popup-footer">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 11a9 9 0 0 1 9 9"></path>
            <path d="M4 4a16 16 0 0 1 16 16"></path>
            <circle cx="5" cy="19" r="2"></circle>
          </svg>
          Próximos buses: No disponible
        </div>
      </div>
    </div>
  );
};

export default PopupContent;

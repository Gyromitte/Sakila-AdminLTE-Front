import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const NavBar = ({ onToggleSidebar }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error al intentar pantalla completa: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      {/* Botón para colapsar Sidebar */}
      <button 
        className="navbar-toggler me-2" 
        type="button" 
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Controles del lado derecho */}
      <div className="d-flex ms-auto">
        {/* Botón de búsqueda (mobile) */}
        <button 
          className="btn btn-link text-white me-2 d-lg-none"
          onClick={toggleSearch}
          aria-label="Buscar"
        >
          <i className="fas fa-search"></i>
        </button>

        {/* Botón de pantalla completa */}
        <button 
          className="btn btn-link text-white"
          onClick={toggleFullscreen}
          aria-label="Pantalla completa"
        >
          <i className={`fas ${fullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
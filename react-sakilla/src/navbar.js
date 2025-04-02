import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Favicon from "./assets/favicon.ico";
import "./App.css";

const NavBar = ({ onToggleSidebar }) => {
    const [fullscreen, setFullscreen] = useState(false);

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
            {/* Burger Button */}
            <button
                className="navbar-toggler d-block ms-3 me-2" // Agregamos márgenes
                type="button"
                onClick={onToggleSidebar}
                aria-label="Toggle sidebar"
            >
                <i className="fas fa-bars"></i>
            </button>

            {/* Sakilla Logo */}
            <img src={Favicon} alt="sakilla_logo" className="nav-img"></img>

            {/* Navbar Title */}
            <h1 className="ml-2">Sakila Films</h1>

            <div className="d-flex ms-auto">
                {/* FullScreen Button */}
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
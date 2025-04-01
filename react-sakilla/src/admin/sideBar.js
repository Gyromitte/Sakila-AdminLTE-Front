import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SideBar = ({ currentPath }) => {
    const menuItems = [
        { path: "/movies", icon: "film", label: "Películas" },
        { path: "/actors", icon: "mask", label: "Actores" },
        { path: "/clients", icon: "users", label: "Clientes" },
        { path: "/rentals", icon: "money-bill", label: "Rentas" },
        { path: "/inventory", icon: "box", label: "Inventario" },
        { path: "/staff", icon: "people-arrows", label: "Staff" },
        { path: "/store", icon: "store", label: "Tiendas" }
    ];

    return (
        <div 
            className="d-flex flex-column p-3 bg-dark text-white" 
            style={{ width: "250px", minHeight: "calc(100vh - 56px)" }}
        >
            <ul className="nav nav-pills flex-column">
                {menuItems.map((item) => (
                    <li key={item.path} className="nav-item">
                        <Link
                            to={item.path}
                            className={`nav-link ${currentPath === item.path ? "active bg-primary" : "text-white hover-bg-light"}`}
                        >
                            <i className={`fas fa-${item.icon} me-2`}></i>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

SideBar.propTypes = {
    currentPath: PropTypes.string.isRequired
};

export default SideBar;
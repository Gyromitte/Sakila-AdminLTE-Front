import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SideBar = ({ currentPath, collapsed }) => {
    const menuItems = [
        { path: "/movies", icon: "film", label: "Películas" },
        { path: "/actors", icon: "mask", label: "Actores" },
        { path: "/clients", icon: "users", label: "Clientes" },
        { path: "/rentals", icon: "money-bill", label: "Rentas" },
        { path: "/AdminDashboard/inventory", icon: "box", label: "Inventario" },
        { path: "/staff", icon: "people-arrows", label: "Staff" },
        { path: "/store", icon: "store", label: "Tiendas" }
    ];

    return (
        <div 
            className={`d-flex flex-column p-3 bg-dark text-white ${collapsed ? 'collapsed-sidebar' : ''}`}
            style={{ 
                width: collapsed ? "80px" : "250px", 
                minHeight: "calc(100vh - 56px)",
                transition: "width 0.3s ease"
            }}
        >
            <ul className="nav nav-pills flex-column">
                {menuItems.map((item) => (
                    <li key={item.path} className="nav-item">
                        <Link
                            to={item.path}
                            className={`nav-link ${currentPath === item.path ? "active bg-primary" : "text-white hover-bg-light"}`}
                            title={collapsed ? item.label : ""}
                        >
                            <i className={`fas fa-${item.icon} ${collapsed ? 'fs-5 mx-auto' : 'me-2'}`}></i>
                            {!collapsed && item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

SideBar.propTypes = {
    currentPath: PropTypes.string.isRequired,
    collapsed: PropTypes.bool
};

SideBar.defaultProps = {
    collapsed: false
};

export default SideBar;
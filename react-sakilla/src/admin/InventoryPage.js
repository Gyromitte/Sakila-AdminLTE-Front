import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReusableTable from "../ReusableTable";
import NavBar from "../navbar";
import SideBar from "./sideBar";

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const loadInventory = async (page) => {
        try {
            const response = await axios.get(`http://143.110.198.189/api/inventories?page=${page}`);
            setInventory(response.data.data);
            setLastPage(response.data.last_page);
        } catch (error) {
            alert("Error al cargar inventario: " + error.message);
        }
    };

    useEffect(() => {
        loadInventory(currentPage);
    }, [currentPage]);

    const headers = ["ID", "Film ID", "Store ID", "Ultima actualización", "Acciones"];

    const actions = [
        { label: "Editar", onClick: (item) => console.log("Editar", item) },
        { label: "Eliminar", onClick: (item) => console.log("Eliminar", item) },
    ];

    return (
        <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            {/* NavBar Superior */}
            <NavBar onToggleSidebar={toggleSidebar} />
            
            <div className="d-flex flex-grow-1">
                {/* SideBar Personalizado */}
                <SideBar 
                    currentPath={location.pathname} 
                    collapsed={sidebarCollapsed}
                />
                
                {/* Contenido Principal */}
                <main className={`flex-grow-1 p-4 bg-light ${sidebarCollapsed ? 'expanded-content' : ''}`}>

                </main>
            </div>
        </div>
    );
};

export default InventoryPage;
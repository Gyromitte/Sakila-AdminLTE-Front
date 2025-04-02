import React, { useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../navbar";
import SideBar from "./sideBar";
import InventoryPage from "./InventoryPage";

const AdminDashboard = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <NavBar onToggleSidebar={toggleSidebar} />
            
            <div className="d-flex flex-grow-1">
                <SideBar 
                    currentPath={location.pathname} 
                    collapsed={sidebarCollapsed}
                />
                
                <main className={`flex-grow-1 p-4 bg-light ${sidebarCollapsed ? 'expanded-content' : ''}`}>
                    <Routes>
                        <Route path="inventory" element={<InventoryPage />} />
                        <Route path="/" element={<div>Bienvenido al Panel de Administración</div>} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/boostrap.min.csss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReusableTable from "../ReusableTable";
import NavBar from "./navbar";

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const loadInventory = async (page) => {
        try {
            const response = await axios.get(`http://143.110.198.189/api/inventories?page=${page}`);
            
        } catch (error) {
            alert("Error al cargar inventario: " + error.message);
        }
    };

    useEffect(() => {
        loadInventory(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < lastPage) setCurrentPage(currentPage + 1);
    };

    const headers = ["ID", "Film ID", "Store ID", "Ultima actualizacion", "Acciones"];

    const actions = [
        { label: "Editar", onClick: (item) => console.log("Editar", item)},
        { label: "Eliminar", onClick: (item) => console.log("Eliminar", item)},
    ];

    return (
        <div className = "wrapper">
            <nav className="navbar navbar-expand navbar-dar bg-dark">
                <a className="navbar-brand" href="#">Admin Panel</a>
            </nav>
        </div>
    )
}
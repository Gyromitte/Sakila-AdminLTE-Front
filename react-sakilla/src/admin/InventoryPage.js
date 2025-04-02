import React, { useEffect, useState } from "react";
import axios from "axios";
import ReusableTable from "../reusableTable";

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadInventory = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://143.110.198.189/api/inventories?page=${page}`);
            
            // Ajuste clave: Accedemos a inventoriData.data
            if (response.data.inventoriData && response.data.inventoriData.data) {
                setInventory(response.data.inventoriData.data);
                setLastPage(response.data.inventoriData.last_page);
            } else {
                throw new Error("Estructura de datos inválida");
            }
        } catch (error) {
            setError("Error al cargar inventario: " + error.message);
            console.error("Error detallado:", error);
            setInventory([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInventory(currentPage);
    }, [currentPage]);

    // Preparamos los datos para la tabla
    const tableData = inventory.map(item => ({
        "Inventory ID": item.inventory_id,
        "Film ID": item.film_id,
        "Store ID": item.store_id,
        "Última actualización": item.last_update ? new Date(item.last_update).toLocaleString() : 'N/A'
    }));

    const headers = ["Inventory ID", "Film ID", "Store ID", "Última actualización"];

    const actions = [
        { 
            label: "Editar", 
            onClick: (item) => console.log("Editar", item["Inventory ID"]) 
        },
        { 
            label: "Eliminar", 
            onClick: async (item) => {
                if(window.confirm(`¿Eliminar item ${item["Inventory ID"]}?`)) {
                    try {
                        await axios.delete(`http://143.110.198.189/api/inventories/${item["Inventory ID"]}`);
                        loadInventory(currentPage);
                    } catch (error) {
                        alert("Error al eliminar: " + error.message);
                    }
                }
            }
        },
    ];

    return (
        <div className="container-fluid">
            <h2>Inventario (Total: {inventory.length})</h2>
            
            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
                    {tableData.length > 0 ? (
                        <>
                            <ReusableTable 
                                headers={headers}
                                data={tableData}
                                actions={actions}
                            />
                            
                            {/* Paginación mejorada */}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    Mostrando página {currentPage} de {lastPage}
                                </div>
                                <nav>
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => setCurrentPage(1)}
                                                disabled={currentPage === 1}
                                            >
                                                Primera
                                            </button>
                                        </li>
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                            >
                                                Anterior
                                            </button>
                                        </li>
                                        
                                        {/* Mostrar solo 5 páginas alrededor de la actual */}
                                        {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
                                            let pageNum;
                                            if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= lastPage - 2) {
                                                pageNum = lastPage - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }
                                            
                                            if (pageNum < 1 || pageNum > lastPage) return null;
                                            
                                            return (
                                                <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                                                    <button 
                                                        className="page-link" 
                                                        onClick={() => setCurrentPage(pageNum)}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                        
                                        <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}
                                                disabled={currentPage === lastPage}
                                            >
                                                Siguiente
                                            </button>
                                        </li>
                                        <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => setCurrentPage(lastPage)}
                                                disabled={currentPage === lastPage}
                                            >
                                                Última
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </>
                    ) : (
                        <div className="alert alert-info">No hay datos de inventario disponibles</div>
                    )}
                </>
            )}
        </div>
    );
};

export default InventoryPage;
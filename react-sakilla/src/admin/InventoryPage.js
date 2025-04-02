import React, { useEffect, useState } from "react";
import axios from "axios";
import ReusableTable from "../reusableTable";

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const loadInventory = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://143.110.198.189/api/inventories?page=${page}`);
            
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

    // Preparamos los datos para la tabla manteniendo las propiedades originales
    const tableData = inventory.map(item => ({
        ...item,
        "Última actualización": item.last_update ? new Date(item.last_update).toLocaleString() : 'N/A'
    }));

    const headers = ["inventory_id", "film_id", "store_id", "Última actualización"];

    const actions = [
        { 
            label: "Editar", 
            onClick: (item) => {
                console.log("Item seleccionado para editar:", item);
                setSelectedItem(item);
                setShowEditModal(true);
            } 
        },
        { 
            label: "Eliminar", 
            onClick: (item) => {
                console.log("Item seleccionado para eliminar:", item);
                setSelectedItem(item);
                setShowDeleteModal(true);
            }
        },
    ];

    return (
        <div className="container-fluid">
            <h2>Inventario</h2>
            
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
                            
                            {/* Paginación */}
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

            {/* Modal de Eliminar */}
            <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmar Eliminación</h5>
                            <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            ¿Estás seguro que deseas eliminar el item #{selectedItem?.inventory_id}?
                            <p className="text-muted mt-2">Film ID: {selectedItem?.film_id}, Store ID: {selectedItem?.store_id}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={async () => {
                                    setIsProcessing(true);
                                    try {
                                        console.log("Eliminando item con ID:", selectedItem?.inventory_id);
                                        await axios.delete(`http://143.110.198.189/api/inventories/${selectedItem?.inventory_id}`);
                                        loadInventory(currentPage);
                                        setShowDeleteModal(false);
                                    } catch (error) {
                                        console.error("Error al eliminar:", error);
                                        alert(`Error al eliminar: ${error.response?.data?.message || error.message}`);
                                    } finally {
                                        setIsProcessing(false);
                                    }
                                }}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showDeleteModal && <div className="modal-backdrop fade show"></div>}

            {/* Modal de Editar */}
            <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Item #{selectedItem?.inventory_id}</h5>
                            <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Film ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={selectedItem?.film_id || ''}
                                    onChange={(e) => setSelectedItem({...selectedItem, film_id: e.target.value})}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Store ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={selectedItem?.store_id || ''}
                                    onChange={(e) => setSelectedItem({...selectedItem, store_id: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancelar</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={async () => {
                                    setIsProcessing(true);
                                    try {
                                        console.log("Actualizando item:", selectedItem);
                                        await axios.put(
                                            `http://143.110.198.189/api/inventories/${selectedItem?.inventory_id}`,
                                            {
                                                film_id: selectedItem?.film_id,
                                                store_id: selectedItem?.store_id
                                            }
                                        );
                                        loadInventory(currentPage);
                                        setShowEditModal(false);
                                    } catch (error) {
                                        console.error("Error al editar:", error);
                                        alert(`Error al editar: ${error.response?.data?.message || error.message}`);
                                    } finally {
                                        setIsProcessing(false);
                                    }
                                }}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showEditModal && <div className="modal-backdrop fade show"></div>}

            {/* Loading durante operaciones */}
            {isProcessing && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryPage;
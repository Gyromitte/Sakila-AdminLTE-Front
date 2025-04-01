import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReusableTable from "./ReusableTable";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const loadInventory = async (page) => {
    try {
      const response = await axios.get(`http://143.110.198.189/api/inventories?page=${page}`);
      setInventory(response.data.inventoriData.data);
      setCurrentPage(response.data.inventoriData.current_page);
      setLastPage(response.data.inventoriData.last_page);
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

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const headers = ["ID", "Film ID", "Store ID", "Última Actualización", "Acciones"];

  const actions = [
    { label: "Editar", onClick: (item) => console.log("Editar", item) },
    { label: "Eliminar", onClick: (item) => console.log("Eliminar", item) },
  ];

  return (
    <div className="wrapper">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Admin Panel</a>
      </nav>
      <div className="d-flex">
        <aside className="bg-light p-3" style={{ width: "250px" }}>
          <h5>Menú</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Inventario</a>
            </li>
          </ul>
        </aside>

        <main className="flex-grow-1 p-4">
          <h1>Inventario</h1>
          <button className="btn btn-success mb-3">
            <i className="fas fa-plus"></i> Agregar
          </button>

          <ReusableTable headers={headers} data={inventory} actions={actions} />

          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-dark me-2" onClick={handlePrevPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span className="align-self-center">Página {currentPage} de {lastPage}</span>
            <button className="btn btn-dark ms-2" onClick={handleNextPage} disabled={currentPage === lastPage}>
              Siguiente
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InventoryPage;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import InventoryPage from "./admin/InventoryPage";
import 'bootstrap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/InventoryPage" element={<InventoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
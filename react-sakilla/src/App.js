import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from "./admin/navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/InventoryPage" element={<NavBar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
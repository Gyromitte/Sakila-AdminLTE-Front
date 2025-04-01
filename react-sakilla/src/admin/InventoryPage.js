import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/boostrap.min.csss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReusableTable from "../ReusableTable";

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const loadInventory = async (page) => {
        try {
            const response = await axios.get()
        }
    }
}
import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button } from 'react-bootstrap';



function MercadoPublico() {
    const [isLoading, setIsLoading] = useState(false);
    const [filtro, setFiltro] = useState("");
    const [locales, setLocales] = useState([]);
    const [resetPaginationToggle] = useState(false);

    useEffect(() => {
        let cachedData = localStorage.getItem("mercadoPublicoData");
        if (cachedData) {
            setLocales(JSON.parse(cachedData));
        } else {
            fetchData();
        }
    }, []);


    const fetchData = () => {
        setIsLoading(true);
        axios
            .get("https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?ticket=54296D76-CAFF-4964-886F-35E9223D30B4&estado=activas")
            .then((response) => {
                setLocales(response.data.Listado);
                localStorage.setItem("mercadoPublicoData", JSON.stringify(response.data.Listado));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const filtrarDatos = () => {
        return locales.filter((item) =>
            Object.values(item).some((value) =>
                typeof value === "string" && value.toLowerCase().includes(filtro.toLowerCase())
            )
        );
    };

    const formatFechaCierre = (row) => {
        const fecha = new Date(row.FechaCierre);
        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        return fecha.toLocaleDateString(undefined, options);
    };

    const handleDetallesClick = async (codigoExterno) => {
        const apiUrl = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?ticket=54296D76-CAFF-4964-886F-35E9223D30B4&codigo=${codigoExterno}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };



    const columns = [
        { name: "Código", selector: (row) => row.CodigoExterno },
        { name: "Nombre", selector: (row) => row.Nombre },
        { name: "Fecha Cierre", selector: (row) => row.FechaCierre, cell: formatFechaCierre },
        {
            name: "Detalles",
            cell: (row) => (
                <Button variant="secondary" onClick={() => handleDetallesClick(row.CodigoExterno)}>
                    Detalles
                </Button>
            ),
        },
        // Agrega más columnas según los datos que desees mostrar
    ];


    return (
        <div>
            <h2>Licitaciones Activas</h2>
            {isLoading ? (
                <p>Cargando...</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={filtrarDatos()}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle}
                    subHeader
                    subHeaderComponent={
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="text"
                                value={filtro}
                                onChange={handleFiltroChange}
                                placeholder="Buscar en todas las columnas"
                                className="form-control"
                                style={{ width: "400px", marginRight: "5px" }}
                            />
                            {filtro && (
                                <button
                                    onClick={() => setFiltro("")}
                                    className="btn btn-outline-secondary"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            )}
                        </div>
                    }
                />
            )}
        </div>
    );
}

export default MercadoPublico;

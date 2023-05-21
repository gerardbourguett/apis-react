import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';


function Farmacias() {
    const [locales, setLocales] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [filtro, setFiltro] = useState('');


    useEffect(() => {
        axios
            .get('https://midas.minsal.cl/farmacia_v2/WS/getLocales.php')
            .then(response => {
                setLocales(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleFiltroChange = e => {
        setFiltro(e.target.value);
    }

    const filtrarDatos = () => {
        return locales.filter(item =>
            Object.values(item).some(value =>
                value.toLowerCase().includes(filtro.toLowerCase())
            )
        );
    };

    const columns = [
        { name: 'Nombre', selector: row => row.local_nombre, sortable: true },
        { name: 'Dirección', selector: row => row.local_direccion, sortable: true },
        { name: 'Comuna', selector: row => row.comuna_nombre, sortable: true },
        { name: 'Horario Apertura', selector: row => row.funcionamiento_hora_apertura, sortable: true },
        { name: 'Horario Cierre', selector: row => row.funcionamiento_hora_cierre, sortable: true },
        { name: 'Teléfono', selector: row => row.local_telefono, sortable: true },
        /* { name: 'Día Funcionamiento', selector: row => row.funcionamiento_dia, sortable: true }, */
        {
            name: 'Ubicación',
            cell: row => (
                <a
                    href={`https://www.google.com/maps?q=${row.local_lat},${row.local_lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ver ubicación
                </a>
            ),
        },
    ];

    return (
        <div className="container mt-5">
            <DataTable
                title="Listado de Farmacias portal MIDAS"
                columns={columns}
                data={filtrarDatos()}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            value={filtro}
                            onChange={handleFiltroChange}
                            placeholder="Buscar en todas las columnas"
                            className="form-control"
                            style={{ width: '400px', marginRight: '5px' }}
                        />
                        {filtro && (
                            <button
                                onClick={() => setFiltro('')}
                                className="btn btn-outline-secondary"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        )}
                    </div>
                }

            />
        </div>
    );
}

export default Farmacias;

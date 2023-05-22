import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import axios from 'axios';
import 'datatables.net-dt/css/jquery.dataTables.css';


const MercadoPublicoDos = () => {
    const tableRef = useRef(null);

    useEffect(() => {
        // Función para obtener los datos de la API
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?ticket=54296D76-CAFF-4964-886F-35E9223D30B4&estado=activas'
                ); // Formatear los datos para DataTables
                const data = response.data.Listado.map((item) => ({
                    Código: item.CodigoExterno,
                    Nombre: item.Nombre,
                    'Fecha Cierre': item.FechaCierre,
                    // Agrega más propiedades según los datos que desees mostrar
                }));

                // Inicializar DataTables.net con los datos obtenidos de la API
                $(tableRef.current).DataTable({
                    data: data,
                    columns: [
                        { data: 'Código', title: 'Código' },
                        { data: 'Nombre', title: 'Nombre' },
                        { data: 'Fecha Cierre', title: 'Fecha Cierre' },
                        // Agrega más columnas según los datos que desees mostrar
                    ],
                });
            } catch (error) {
                console.error('Error al obtener los datos de la API:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <table className='table table-striped table-bordered' ref={tableRef}>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Fecha Cierre</th>
                        <th>Detalles</th>
                        {/* Agrega más encabezados de columna según los datos que desees mostrar */}
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    );
};

export default MercadoPublicoDos;
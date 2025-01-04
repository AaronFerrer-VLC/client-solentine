import React from 'react'
import Table from 'react-bootstrap/Table'

const TableSales = ({ datos }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Día</th>
                    <th>Mes</th>
                    <th>Año</th>
                    <th>Fecha</th>
                    <th>Negocio</th>
                    <th>Zona</th>
                    <th>Marca</th>
                    <th>Cliente</th>
                    <th>Importe</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(datos) && datos.length > 0 ? ( // Validar que datos sea un array
                    datos.map((dato, index) => (
                        <tr key={dato._id}>
                            <td>{index + 1}</td>
                            <td>{dato.Día}</td>
                            <td>{dato.Mes}</td>
                            <td>{dato.Año}</td>
                            <td>{dato.Fecha}</td>
                            <td>{dato.Negocio}</td>
                            <td>{dato.Zona}</td>
                            <td>{dato.Marca}</td>
                            <td>{dato.Cliente}</td>
                            <td>{dato.Importe}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="10">No hay datos disponibles</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default TableSales
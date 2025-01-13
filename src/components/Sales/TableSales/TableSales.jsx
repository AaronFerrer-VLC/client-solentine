import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Loader from '../../Loader/Loader';

const TableSales = ({ sales, onSortChange, onEditClick, onDeleteClick }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSort = (key, direction) => {
        onSortChange(key, direction);
    };

    return (
        isLoading ? <Loader /> :
            <div className='TableSales'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                ID
                                <Button variant="link" disabled={isLoading} onClick={() => handleSort('Id', 'asc')}>↑</Button>
                                <Button variant="link" disabled={isLoading} onClick={() => handleSort('Id', 'desc')}>↓</Button>
                            </th>
                            <th>
                                Fecha
                                <Button variant="link" disabled={isLoading} onClick={() => handleSort('Fecha', 'asc')}>↑</Button>
                                <Button variant="link" disabled={isLoading} onClick={() => handleSort('Fecha', 'desc')}>↓</Button>
                            </th>
                            <th>Negocio</th>
                            <th>Zona</th>
                            <th>Marca</th>
                            <th>Cliente</th>
                            <th>
                                Importe
                                <Button variant="link" disabled={isLoading} onClick={() => handleSort('Importe', 'asc')}>↑</Button>
                                <Button variant="link" disabled={isLoading} onClick={() => handleSort('Importe', 'desc')}>↓</Button>
                            </th>
                            <th>Comercial</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale._id}>
                                <td>{sale.Id}</td>
                                <td>{sale.Fecha}</td>
                                <td>{sale.Negocio}</td>
                                <td>{sale.Zona}</td>
                                <td>{sale.Marca}</td>
                                <td>{sale.Cliente}</td>
                                <td>{sale.Importe}</td>
                                <td>{sale.Comercial}</td>
                                <td>
                                    {onEditClick && (
                                        <Button
                                            variant="warning"
                                            onClick={() => onEditClick(sale)}
                                        >
                                            Editar
                                        </Button>
                                    )}
                                    {onDeleteClick && (
                                        <Button
                                            variant="danger"
                                            className="ms-2"
                                            onClick={() => onDeleteClick(sale)}
                                        >
                                            Eliminar
                                        </Button>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
    );
};

export default TableSales;
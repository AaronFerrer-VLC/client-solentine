import React, { useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import Loader from '../../Loader/Loader';

const TableSales = ({ sales, onSortChange, onEditClick, onDeleteClick }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSorting, setIsSorting] = useState(false);

    const handleSort = async (key, direction) => {
        setIsSorting(true);
        await onSortChange(key, direction);
        setIsSorting(false);
    };

    return (
        isLoading ? <Loader /> :
            <div className='TableSales'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                ID
                                <Button variant="link" disabled={isSorting} onClick={() => handleSort('Id', 'asc')}>↑</Button>
                                <Button variant="link" disabled={isSorting} onClick={() => handleSort('Id', 'desc')}>↓</Button>
                            </th>
                            <th>
                                Fecha
                                <Button variant="link" disabled={isSorting} onClick={() => handleSort('Fecha', 'asc')}>↑</Button>
                                <Button variant="link" disabled={isSorting} onClick={() => handleSort('Fecha', 'desc')}>↓</Button>
                            </th>
                            <th>Negocio</th>
                            <th>Zona</th>
                            <th>Marca</th>
                            <th>Cliente</th>
                            <th>
                                Importe
                                <Button variant="link" disabled={isSorting} onClick={() => handleSort('Importe', 'asc')}>↑</Button>
                                <Button variant="link" disabled={isSorting} onClick={() => handleSort('Importe', 'desc')}>↓</Button>
                            </th>
                            <th>Comercial</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSorting ? (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    <Spinner animation="border" />
                                </td>
                            </tr>
                        ) : (
                            sales.map((sale) => (
                                <tr key={sale._id}>
                                    <td>{sale.Id}</td>
                                    <td>{sale.Fecha}</td>
                                    <td>{sale.Negocio}</td>
                                    <td>{sale.Zona?.name || ''}</td>
                                    <td>{sale.Marca?.name || ''}</td>
                                    <td>{sale.Cliente?.name || ''}</td>
                                    <td>{sale.Importe}</td>
                                    <td>{sale.Comercial?.name || ''}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => onEditClick(sale)}>Editar</Button>
                                        <Button className='ms-2' variant="danger" onClick={() => onDeleteClick(sale)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
    );
};

export default TableSales;
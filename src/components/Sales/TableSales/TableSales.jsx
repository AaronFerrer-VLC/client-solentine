import { useState, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Spinner } from 'react-bootstrap'
import Loader from '../../Loader/Loader'

import './TableSales.css'

const TableSales = memo(({ sales, onSortChange, onEditClick, onDeleteClick }) => {
    const [isLoading] = useState(false)
    const [isSorting, setIsSorting] = useState(false)

    const handleSort = useCallback(async (key, direction) => {
        setIsSorting(true);
        await onSortChange(key, direction)
        setIsSorting(false)
    }, [onSortChange])

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
    )
});

TableSales.displayName = 'TableSales';

TableSales.propTypes = {
    sales: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            Id: PropTypes.string,
            Fecha: PropTypes.string,
            Negocio: PropTypes.string,
            Zona: PropTypes.shape({
                name: PropTypes.string,
            }),
            Marca: PropTypes.shape({
                name: PropTypes.string,
            }),
            Cliente: PropTypes.shape({
                name: PropTypes.string,
            }),
            Importe: PropTypes.string,
            Comercial: PropTypes.shape({
                name: PropTypes.string,
            }),
        })
    ).isRequired,
    onSortChange: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default TableSales
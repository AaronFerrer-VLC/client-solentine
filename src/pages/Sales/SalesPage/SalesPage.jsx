import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Modal, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import saleServices from '../../../services/sale.services';
import CreateSaleForm from '../../../components/Sales/CreateSaleForm/CreateSaleForm';
import EditSaleForm from '../../../components/Sales/EditSaleForm/EditSaleForm';
import FiltersSale from '../../../components/Filters/FitersSale/FiltersSale';
import TableSales from "../../../components/Sales/TableSales/TableSales";
import { AuthContext } from '../../../contexts/auth.context';
import Loader from '../../../components/Loader/Loader';

import './SalesPage.css';

const SalesPage = () => {
    const [salesData, setSalesData] = useState([]);
    const [visibleSales, setVisibleSales] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const salesPerPage = 100;
    const [filters, setFilters] = useState({});
    const [sortOrder, setSortOrder] = useState({ key: 'Fecha', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalState, setModalState] = useState({ type: null, sale: null });
    const { hasRole } = useContext(AuthContext);

    useEffect(() => {
        fetchSales();
    }, [currentPage, filters, sortOrder]);

    const fetchSales = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data } = await saleServices.getAllSales(currentPage, salesPerPage, filters, sortOrder);
            if (data) {
                setSalesData(data.sales);
                setVisibleSales(data.sales);
                setTotalSales(data.totalSales);
                setTotalPages(Math.ceil(data.totalSales / salesPerPage));
            }
        } catch (err) {
            console.error(err);
            setError('Hubo un problema al cargar los datos.');
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, filters, sortOrder]);

    const handleFiltersChange = async (filters) => {
        setFilters(filters);
        setCurrentPage(1);
    };

    const handleSortChange = async (key, direction) => {
        setSortOrder({ key, direction });
        setCurrentPage(1);
    };

    const handlePageChange = (direction) => {
        const newPage = currentPage + direction;
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleCreateSale = () => setModalState({ type: 'create', sale: null });

    const handleSaleAction = (type, sale) => setModalState({ type, sale });

    const handleCloseModal = () => setModalState({ type: null, sale: null });

    const handleDeleteSale = async () => {
        if (!modalState.sale?._id) {
            setError("ID de la venta no válido");
            return;
        }
        try {
            await saleServices.deleteSale(modalState.sale._id);
            await fetchSales();
            handleCloseModal();
        } catch (err) {
            setError('Hubo un problema al eliminar la venta');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearFilters = () => {
        setFilters({});
        setCurrentPage(1);
        fetchSales();
    };

    const compareDates = (a, b) => {
        const [dayA, monthA, yearA] = a.split('/').map(Number);
        const [dayB, monthB, yearB] = b.split('/').map(Number);
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return dateA - dateB;
    };

    const sortSales = (sales, key, direction) => {
        return sales.sort((a, b) => {
            if (key === 'Fecha') {
                const result = compareDates(a[key], b[key]);
                return direction === 'asc' ? result : -result;
            } else if (key === 'Importe') {
                const valueA = parseFloat(a[key]) || 0;
                const valueB = parseFloat(b[key]) || 0;
                return direction === 'asc' ? valueA - valueB : valueB - valueA;
            } else {
                const valueA = a[key] || '';
                const valueB = b[key] || '';
                if (valueA < valueB) return direction === 'asc' ? -1 : 1;
                if (valueA > valueB) return direction === 'asc' ? 1 : -1;
                return 0;
            }
        });
    };

    return (
        isLoading ? <Loader /> :
            <div className="SalesPage">
                <Container>
                    <Row className="mb-4">
                        <Col>
                            <h3 className="text-center">Ventas de Solentine</h3>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Card className="p-4 shadow-sm">
                                <FiltersSale onChange={handleFiltersChange} onClear={handleClearFilters} />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="p-4 shadow-sm">
                                <TableSales
                                    sales={sortSales(visibleSales, sortOrder.key, sortOrder.direction)}
                                    onSortChange={handleSortChange}
                                    onEditClick={(sale) => handleSaleAction('edit', sale)}
                                    onDeleteClick={(sale) => handleSaleAction('delete', sale)}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="d-flex justify-content-between">
                            <Button className="btn btn-primary mb-2" onClick={handleCreateSale}>
                                Crear Venta
                            </Button>
                            <div>
                                <Button
                                    className="btn btn-primary me-2 mb-2"
                                    onClick={() => handlePageChange(-1)}
                                    disabled={currentPage === 1}
                                >
                                    Anterior
                                </Button>
                                <span className="page-info"> Página {currentPage} de {totalPages}</span>
                                <Button
                                    className="btn btn-primary ms-2 mb-2"
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Siguiente
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {modalState.type === 'create' && (
                        <Modal show onHide={handleCloseModal} size="xl" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Crear Venta</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateSaleForm onSaleSaved={fetchSales} onClose={handleCloseModal} />
                            </Modal.Body>
                        </Modal>
                    )}

                    {modalState.type === 'edit' && modalState.sale && (
                        <Modal show onHide={handleCloseModal} size="xl" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Editar Venta</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditSaleForm sale={modalState.sale} onSaleSaved={fetchSales} onClose={handleCloseModal} />
                            </Modal.Body>
                        </Modal>
                    )}

                    {modalState.type === 'delete' && modalState.sale && (
                        <Modal show onHide={handleCloseModal} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Eliminar Venta</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>¿Estás seguro de que quieres eliminar esta venta?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleDeleteSale}>
                                    Eliminar
                                </Button>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Cancelar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}
                </Container>
            </div>
    );
};

export default SalesPage;
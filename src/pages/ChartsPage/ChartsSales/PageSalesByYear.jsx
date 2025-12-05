import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import ChartsSalesByYear from '../../../components/Charts/ChartsSales/ChartSalesByYear/ChartSalesByYear';
import SaleServices from '../../../services/sale.services';
import './PageSalesByYear.css';

const PageSalesByYear = () => {
    const [filter, setFilter] = useState('year');
    const [year, setYear] = useState(new Date().getFullYear());
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await SaleServices.getAllSalesWithoutPagination();
                console.log('Sales data fetched:', response.data.sales); // Debugging information
                let salesData = [];
                if (filter === 'year') {
                    salesData = response.data.sales.reduce((acc, sale) => {
                        const year = sale.Año;
                        if (!acc[year]) {
                            acc[year] = { year, sales: 0 };
                        }
                        acc[year].sales += sale.Importe;
                        return acc;
                    }, {});
                } else if (filter === 'month') {
                    salesData = response.data.sales.reduce((acc, sale) => {
                        if (sale.Año === year) {
                            const month = sale.Mes;
                            if (!acc[month]) {
                                acc[month] = { month, sales: 0 };
                            }
                            acc[month].sales += sale.Importe;
                        }
                        return acc;
                    }, {});
                } else if (filter === 'date') {
                    salesData = response.data.sales.reduce((acc, sale) => {
                        if (sale.Año === year) {
                            const date = sale.Fecha;
                            if (!acc[date]) {
                                acc[date] = { date, sales: 0 };
                            }
                            acc[date].sales += sale.Importe;
                        }
                        return acc;
                    }, {});
                }
                console.log('Processed sales data:', salesData); // Debugging information
                setData(Object.values(salesData));
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, [filter, year]);

    return (
        <div className="PageSalesByYear">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h1 className="text-center">Dashboard de Ventas</h1>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <Card className="p-4 shadow-sm">
                            <Form>
                                <Form.Group as={Row} controlId="filter">
                                    <Form.Label column sm={2}>Filtrar por:</Form.Label>
                                    <Col sm={4}>
                                        <Form.Control as="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                            <option value="year">Año</option>
                                            <option value="month">Mes</option>
                                            <option value="date">Fecha</option>
                                        </Form.Control>
                                    </Col>
                                    {filter !== 'year' && (
                                        <Col sm={4}>
                                            <Form.Control
                                                type="number"
                                                value={year}
                                                onChange={(e) => setYear(parseInt(e.target.value, 10))}
                                                placeholder="Año"
                                            />
                                        </Col>
                                    )}
                                </Form.Group>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="p-4 shadow-sm">
                            <ChartsSalesByYear data={data} filter={filter} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default PageSalesByYear
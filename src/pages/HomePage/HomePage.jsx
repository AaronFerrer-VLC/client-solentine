import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from 'react-router-dom'
import './HomePage.css';
import clientServices from '../../services/client.services';
import comercialServices from '../../services/comercial.services';
import saleServices from '../../services/sale.services';

const containerStyle = {
    width: '100%',
    height: '400px'
}

const center = {
    lat: 39.57299,
    lng: 2.65586
}

const HomePage = () => {
    const [clients, setClients] = useState([]);
    const [comercials, setComercials] = useState([]);
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedZone, setSelectedZone] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientsData, comercialsData, salesData] = await Promise.all([
                    clientServices.getAllClients(),
                    comercialServices.getAllComercials(),
                    saleServices.getAllSalesForHomePage()
                ])

                setClients(clientsData.data);
                setComercials(comercialsData.data);
                setSales(salesData.data.sales);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container className="HomePage mt-5">
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">Bienvenido a Solentine</h1>
                    <p className="text-center">Tu herramienta integral para la gestión de ventas, clientes y comerciales.</p>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Ventas</Card.Title>
                            <Card.Text>Gestiona y visualiza todas tus ventas de manera eficiente.</Card.Text>
                            <Button variant="primary" as={Link} to="/ventas">Ver Ventas</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Clientes</Card.Title>
                            <Card.Text>Administra tus clientes y mantén toda su información actualizada.</Card.Text>
                            <Button variant="primary" as={Link} to="/clientes">Ver Clientes</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Comerciales</Card.Title>
                            <Card.Text>Gestiona a tus comerciales y optimiza su rendimiento.</Card.Text>
                            <Button variant="primary" as={Link} to="/comerciales">Ver Comerciales</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">Estadísticas Resumidas</h2>
                    <p className="text-center">Visualiza un resumen de tus datos clave.</p>
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                            <Spinner animation="border" />
                        </div>
                    ) : (
                        <Row className="text-center">
                            <Col md={4}>
                                <Card className="text-center">
                                    <Card.Body>
                                        <h3>{sales.length}</h3>
                                        <p>Ventas Totales</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="text-center">
                                    <Card.Body>
                                        <h3>{clients.length}</h3>
                                        <p>Clientes Activos</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="text-center">
                                    <Card.Body>
                                        <h3>{comercials.length}</h3>
                                        <p>Comerciales</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">Mapa de Zonas y Clientes</h2>
                    <LoadScript googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={2}
                        >
                            {sales.map((sale, index) => (
                                sale.Zona && sale.Zona.position ? (
                                    <Marker
                                        key={index}
                                        position={{ lat: sale.Zona.position.lat, lng: sale.Zona.position.lng }}
                                        onClick={() => setSelectedZone(sale.Zona)}
                                    />
                                ) : null
                            ))}
                            {clients.map((client, index) => (
                                client.position ? (
                                    <Marker
                                        key={index}
                                        position={{ lat: client.position.lat, lng: client.position.lng }}
                                        onClick={() => setSelectedClient(client)}
                                    />
                                ) : null
                            ))}
                            {selectedZone && (
                                <InfoWindow
                                    position={{ lat: selectedZone.position.lat, lng: selectedZone.position.lng }}
                                    onCloseClick={() => setSelectedZone(null)}
                                >
                                    <div>
                                        <h4>{selectedZone.name}</h4>
                                        <p>{selectedZone.address}</p>
                                    </div>
                                </InfoWindow>
                            )}
                            {selectedClient && (
                                <InfoWindow
                                    position={{ lat: selectedClient.position.lat, lng: selectedClient.position.lng }}
                                    onCloseClick={() => setSelectedClient(null)}
                                >
                                    <div>
                                        <h4>{selectedClient.name}</h4>
                                        <p>{selectedClient.address}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    </LoadScript>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Card, Button } from 'react-bootstrap';
import './HomePage.css';
import clientServices from '../../services/client.services';
import comercialServices from '../../services/comercial.services';
import saleServices from '../../services/sale.services';
import geocodingServices from '../../services/geocoding.services';
import ClientMap from '../../components/ClientMap/ClientMap';

const HomePage = () => {
    const [clients, setClients] = useState([]);
    const [comercials, setComercials] = useState([]);
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientsData, comercialsData, salesData] = await Promise.all([
                    clientServices.getAllClients(),
                    comercialServices.getAllComercials(),
                    saleServices.getAllSalesForHomePage()
                ]);

                setClients(clientsData.data);
                setComercials(comercialsData.data);
                setSales(salesData.data.sales);

                const clientMarkers = await Promise.all(clientsData.data.map(async (client) => {
                    try {
                        const geocodeResult = await geocodingServices.getCoordinates(client.address);
                        if (
                            geocodeResult &&
                            geocodeResult.results &&
                            geocodeResult.results.length > 0 &&
                            geocodeResult.results[0].geometry
                        ) {
                            const location = geocodeResult.results[0].geometry.location;
                            return {
                                id: client._id,
                                name: client.name,
                                address: client.address,
                                position: {
                                    lat: location.lat,
                                    lng: location.lng
                                }
                            };
                        } else {
                            console.warn(`No se encontraron resultados para: ${client.address}`);
                            return null;
                        }
                    } catch (error) {
                        console.error(`Error al procesar el cliente ${client.name}: ${error.message}`);
                        return null;
                    }
                }));

                setMarkers(clientMarkers.filter(marker => marker !== null));
                setIsLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
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
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <h3 className="text-center">Mapa de Clientes y Zonas</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ClientMap markers={markers} />
                        </Col>
                    </Row>
                </Container>
            </div>
            )
            );
};

            export default HomePage;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Spinner } from 'react-bootstrap';
import clientServices from '../../services/client.services';
import ListClient from '../../components/Client/ClientList/ClientList';
import CreateClientForm from '../../components/Client/CreateClientForm/CreateClientForm';
import EditClientForm from '../../components/Client/EditClientForm/EditClientForm'

import './ClientPage.css';
import Loader from '../../components/Loader/Loader';

const ClientPage = () => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalState, setModalState] = useState({ type: null, client: null });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setIsLoading(true);
        try {
            const { data } = await clientServices.getAllClients();
            setClients(data);
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateClient = () => setModalState({ type: 'create', client: null });

    const handleEditClient = (client) => setModalState({ type: 'edit', client });

    const handleDeleteClient = async (client) => {
        try {
            await clientServices.deleteClient(client._id);
            fetchClients();
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
        }
    };

    const handleCloseModal = () => setModalState({ type: null, client: null });

    return (
        isLoading ? <Loader /> :
            <div className='ClientPage'>
                <Container className="ClientPage">
                    <Row className="mb-4">
                        <Col>
                            <h3 className="text-center">Clientes</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {isLoading ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                    <Spinner animation="border" />
                                </div>
                            ) : (
                                <ListClient
                                    clients={clients}
                                    onEditClick={handleEditClient}
                                    onDeleteClick={handleDeleteClient}
                                />
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="d-flex justify-content-end">
                            <Button variant="dark" onClick={handleCreateClient}>Crear Cliente</Button>
                        </Col>
                    </Row>

                    {modalState.type === 'create' && (
                        <Modal show onHide={handleCloseModal} size="lg" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Crear Cliente</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateClientForm onClientSaved={fetchClients} onClose={handleCloseModal} />
                            </Modal.Body>
                        </Modal>
                    )}

                    {modalState.type === 'edit' && modalState.client && (
                        <Modal show onHide={handleCloseModal} size="lg" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Editar Cliente</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditClientForm client={modalState.client} onClientSaved={fetchClients} onClose={handleCloseModal} />
                            </Modal.Body>
                        </Modal>
                    )}
                </Container>
            </div>
    )
}
export default ClientPage
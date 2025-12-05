import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Spinner, Modal } from 'react-bootstrap'
import comercialServices from '../../services/comercial.services'
import ListComercial from '../../components/Comercials/ListComercials/ListComercials'
import CreateComercialForm from '../../components/Comercials/CreateComercialForm/CreateComercialForm'
import EditComercialForm from '../../components/Comercials/EditComercialForm/EditComercialForm'

import Loader from '../../components/Loader/Loader'

import './ComercialsPage.css'

const ComercialsPage = () => {
    const [comercials, setComercials] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [modalState, setModalState] = useState({ type: null, comercial: null })

    const fetchComercials = async () => {
        try {
            const response = await comercialServices.getAllComercials()
            setComercials(response.data)
            setIsLoading(false)
        } catch (error) {
            console.error('Error al cargar los comerciales:', error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchComercials()
    }, [])

    const handleCreateComercial = () => setModalState({ type: 'create', comercial: null })
    const handleEditComercial = (comercial) => setModalState({ type: 'edit', comercial })
    const handleDeleteComercial = async (comercial) => {
        try {
            await comercialServices.deleteComercial(comercial._id)
            fetchComercials()
        } catch (error) {
            console.error('Error al eliminar el comercial:', error)
        }
    }
    const handleCloseModal = () => setModalState({ type: null, comercial: null })

    return (
        isLoading ? <Loader /> :
            <div className='ComercialsPage'>
                <Container className="ComercialsPage">
                    <Row className="mb-4">
                        <Col>
                            <h3 className="text-center">Comerciales</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {isLoading ? (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                    <Spinner animation="border" />
                                </div>
                            ) : (
                                <ListComercial
                                    comercials={comercials}
                                    onEditClick={handleEditComercial}
                                    onDeleteClick={handleDeleteComercial}
                                />
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="d-flex justify-content-end">
                            <Button variant="dark" onClick={handleCreateComercial}>Crear Comercial</Button>
                        </Col>
                    </Row>
                    {modalState.type === 'create' && (
                        <Modal show onHide={handleCloseModal} size="lg" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Crear Comercial</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateComercialForm
                                    onComercialSaved={fetchComercials}
                                    onClose={handleCloseModal}
                                />
                            </Modal.Body>
                        </Modal>
                    )}

                    {modalState.type === 'edit' && (
                        <Modal show onHide={handleCloseModal} size="lg" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Editar Comercial</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditComercialForm
                                    comercial={modalState.comercial}
                                    onComercialSaved={fetchComercials}
                                    onClose={handleCloseModal}
                                />
                            </Modal.Body>
                        </Modal>
                    )}
                </Container>
            </div>
    )
}

export default ComercialsPage
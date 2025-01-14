import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../contexts/auth.context";
import Loader from "../../../components/Loader/Loader";
import EditFormUser from "../../../components/User/EditFormUser/EditFormUser";
import userServices from '../../../services/user.services';
import "./UserProfilePage.css";
import { homer } from "../../../const/image-path"

const UserProfilePage = () => {
    const { loggedUser, logoutUser } = useContext(AuthContext);
    const { id: userId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const fetchUserData = () => {
        userServices
            .getUser(userId)
            .then((response) => {
                const { data: userData } = response;
                setUserData(userData);
                setIsLoading(false);
            })
            .catch((err) => {
                setError('Error fetching user data');
                setIsLoading(false);
            });
    };

    const handleDeleteUser = () => {
        userServices
            .deleteUser(userId)
            .then(() => {
                logoutUser();
                navigate('/');
            })
            .catch((err) => {
                setError('Error deleting user');
            });
    };

    if (isLoading) {
        return <Loader message="Cargando Perfil del usuario..." />;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    const { avatar, username, bio, role, sales = [], email, createdAt, updatedAt, deletedAt } = userData || {};

    return (
        <div className='UserProfilePage'>
            <Container className="mt-5">
                <Row className="mb-4">
                    <Col>
                        <Card className="p-4 shadow-sm">
                            <Row className="d-flex justify-content-center align-items-center">
                                <Col xs={12} md={3} className="text-center">
                                    <img className="border border-white object-fit-cover rounded-circle"
                                        style={{ height: "5rem", width: "5rem" }}
                                        src={avatar ? avatar : homer}
                                        alt="Avatar del usuario" />
                                </Col>
                                <Col xs={12} md={9}>
                                    <Row className="align-items-center">
                                        <Col xs={12} md={8}>
                                            <h3 className="fw-bold">{username}</h3>
                                            <p className="fs-5">{bio}</p>
                                            <p className="fs-5">Email: {email}</p>
                                            <p className="fs-5">Role: {role}</p>
                                            <p className="fs-5">Ventas registradas: {sales.length}</p>
                                            <p className="fs-5">Creado: {new Date(createdAt).toLocaleDateString()}</p>
                                            <p className="fs-5">Actualizado: {new Date(updatedAt).toLocaleDateString()}</p>
                                            {deletedAt && (
                                                <p className="fs-5">Eliminado: {new Date(deletedAt).toLocaleDateString()}</p>
                                            )}
                                        </Col>
                                        <Col xs={12} md={4} className="text-md-end">
                                            {loggedUser?._id === userId && (
                                                <>
                                                    <Button className="border-0 fw-bold btn-style-1 bg-transparent" onClick={() => setShowEditModal(true)}>
                                                        Editar Perfil
                                                    </Button>
                                                    <Button className="border-0 fw-bold btn-style-1 bg-transparent text-danger" onClick={() => setShowDeleteModal(true)}>
                                                        Eliminar Perfil
                                                    </Button>
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditFormUser userData={userData} onClose={() => setShowEditModal(false)} />
                    </Modal.Body>
                </Modal>
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar Perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Estás seguro de que quieres eliminar tu perfil? Esta acción no se puede deshacer.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleDeleteUser}>
                            Eliminar
                        </Button>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default UserProfilePage;

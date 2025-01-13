import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AuthContext } from "../../../contexts/auth.context";
import Loader from "../../../components/Loader/Loader";
import EditFormUser from "../../../components/User/EditFormUser/EditFormUser";
import ProfileUserCard from '../../../components/User/ProfileUserCard/ProfileUserCard';
import userServices from '../../../services/user.services';
import "./UserProfilePage.css";
import { homer } from "../../../const/image-path"; // Asegúrate de que la ruta sea correcta

const UserProfilePage = () => {
    const { loggedUser } = useContext(AuthContext);
    const { id: userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

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

    if (isLoading) {
        return <Loader message="Cargando Perfil del usuario..." />;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    const { avatar, username, role, sales = [], email, createdAt, updatedAt, deletedAt } = userData || {};

    return (
        <div className='UserProfilePage'>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <Row className="p-sm-3 d-flex justify-content-center align-items-center">
                            <Col xs={3} lg={1}>
                                <img className="border border-white object-fit-cover rounded-circle"
                                    style={{ height: "5rem", width: "5rem" }}
                                    src={avatar ? avatar : homer}
                                    alt="Avatar del usuario" />
                            </Col>
                            <Col xs={9} lg={5}>
                                <Row className="align-items-center">
                                    <Col xs={{ span: "auto" }}>
                                        <span className="fw-bold fs-3">{username}</span>
                                    </Col>
                                    <Col xs={{ span: "auto" }}>
                                        {loggedUser?._id === userId && (
                                            <Button className="border-0 fw-bold btn-style-1 bg-transparent" onClick={() => setShowEditModal(true)}>
                                                Editar Perfil
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="fs-5">{role}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
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
            </Container>
        </div>
    );
};

export default UserProfilePage;

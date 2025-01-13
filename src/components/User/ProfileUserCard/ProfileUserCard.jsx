import { Link } from "react-router-dom"
import './ProfileUserCard.css'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { homer } from "../../../const/image-path"

const ProfileUserCard = ({ _id, avatar, username, role, email }) => {
    return (
        <div className="ProfileUserCard">
            <Container className="profile-user-card text-center">
                <Row lg={{ span: 12 }} className="g-4">
                    <Col>
                        <Card className="border-0 text-white p-3" style={{ backgroundColor: 'rgb(6, 6, 19)' }}>
                            <Link to={`/usuarios/${_id}`}>
                                <img
                                    className="user-avatar border border-white rounded-circle"
                                    src={avatar || homer}
                                    alt={`${username || 'Usuario'} avatar`}
                                />
                            </Link>
                            <h5 className="mt-3 mb-1">
                                <Link to={`/usuarios/${_id}`} className="text-decoration-none text-white">
                                    {username || 'Usuario desconocido'}
                                </Link>
                            </h5>
                            <p>Email: {email || 'No disponible'}</p>
                            <p>Role: {role || 'No especificado'}</p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfileUserCard

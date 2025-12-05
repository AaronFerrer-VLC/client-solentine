import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import './ProfileUserCard.css'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { homer } from "../../../const/image-path"

const ProfileUserCard = ({ _id, avatar, username, role, email }) => {
    return (
        <div className="ProfileUserCard">
            <Container className="profile-user-card text-center">
                <Row lg={{ span: 12 }} className="g-4">
                    <Col>
                        <Card className="border-0 text-black p-3" style={{ backgroundColor: 'rgb(0, 0, 0)' }}>
                            <Link to={`/usuarios/${_id}`}>
                                <img
                                    className="user-avatar border border-black rounded-circle"
                                    src={avatar || homer}
                                    alt={`${username || 'Usuario'} avatar`}
                                />
                            </Link>
                            <h5 className="mt-3 mb-1">
                                <Link to={`/usuarios/${_id}`} className="text-decoration-none text-black">
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

ProfileUserCard.propTypes = {
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
}

export default ProfileUserCard

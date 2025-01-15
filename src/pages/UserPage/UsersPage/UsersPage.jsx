import ProfileUserList from "../../../components/User/ProfileUserList/ProfileUserList"
import userServices from "../../../services/user.services"
import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Loader from "../../../components/Loader/Loader"
import { useNavigate } from "react-router-dom"

import './UsersPage.css'

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        userServices
            .getAllUsers()
            .then(response => {
                setUsers(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleUserClick = (userId) => {
        navigate(`/usuarios/${userId}`)
    }

    return (
        isLoading ? <Loader /> :
            <div className="UsersPage">
                <Container className="mt-3">
                    <Row className="mb-4">
                        <Col>
                            <p className="fs-6 m-0 opacity-50 mb-3">Descubre nuestr@s {users.length} usuari@s</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ProfileUserList users={users} onUserClick={handleUserClick} />
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}

export default UsersPage
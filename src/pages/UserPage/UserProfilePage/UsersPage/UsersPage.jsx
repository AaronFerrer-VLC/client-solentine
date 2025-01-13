import ProfileUserList from "../../../../components/User/ProfileUserList/ProfileUserList"
import userServices from "../../../../services/user.services"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import Loader from "../../../../components/Loader/Loader"
import { useNavigate } from "react-router-dom"

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
                <div className="HomePage">
                    <Container className="mt-3" >
                        <p className="fs-6 m-0 opacity-50 mb-3">Descubre nuestr@s {users.length} usuari@s</p>
                        <ProfileUserList users={users} onUserClick={handleUserClick} />
                    </Container>
                </div>
            </div>
    )
}

export default UsersPage
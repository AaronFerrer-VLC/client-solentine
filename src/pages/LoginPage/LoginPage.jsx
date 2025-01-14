import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/User/LoginForm/LoginForm'
import Loader from '../../components/Loader/Loader'
import { useState } from 'react'
import './LoginPage.css'

const LoginPage = () => {

    const [isLoading, setIsLoading] = useState(false)

    return (
        isLoading ? <Loader /> :
            <div className='LoginPage'>
                <Container>
                    <Row>
                        <Col md={{ offset: 3, span: 6 }} className="login-form-container">
                            <h1 className="text-center">Acceso</h1>
                            <hr />
                            <LoginForm />
                        </Col>
                    </Row>
                </Container>
            </div>
    );
}

export default LoginPage
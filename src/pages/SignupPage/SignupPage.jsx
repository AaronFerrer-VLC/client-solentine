import { Container, Row, Col } from 'react-bootstrap'
import './SignupPage.css'
import { useState } from 'react'
import SignupForm from '../../components/User/SignupForm/SignupForm'
import './SignupPage.css'
const SignupPage = () => {

    const [isLoading, setIsLoading] = useState(false)

    return (
        isLoading ? <Loader /> :
            <div className='SignupPage'>
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }} className="signup-form-container">
                            <h1 className="text-center">Registro</h1>
                            <hr />
                            <SignupForm />
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}

export default SignupPage
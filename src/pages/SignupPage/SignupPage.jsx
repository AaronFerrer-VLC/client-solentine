import { Container, Row, Col } from 'react-bootstrap'
import './SignupPage.css'
import { useState } from 'react'
import SignupForm from '../../components/User/SignupForm/SignupForm'

const SignupPage = () => {

    const [isLoading, setIsLoading] = useState(false)

    return (
        isLoading ? <Loader /> :
            <div className='SignupPage'>
                <Container>

                    <Row>

                        <Col md={{ span: 6, offset: 3 }}>

                            <h1>Registro</h1>

                            <hr />

                            <SignupForm />

                        </Col>
                    </Row>

                </Container>
            </div>
    )
}

export default SignupPage
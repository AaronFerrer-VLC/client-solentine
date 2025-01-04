import './Footer.css'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Footer = () => {

    return (

        <div className="Footer">
            <Navbar>
                <Container className="fs-6 opacity-50 d-flex flex-column text-center pt-2 pb-2 flex-row@lg align-items-center justify-content-between@lg">
                    <Nav className="mb-1 text-center flex-wrap justify-content-center">
                        <Nav.Link href="#" className="text-white">Centro de ayuda</Nav.Link>
                        <Nav.Link href="#" className="text-white">Aviso Legal</Nav.Link>
                        <Nav.Link href="#" className="text-white">Prensa</Nav.Link>
                        <Nav.Link href="#" className="text-white">¿Quiénes somos?</Nav.Link>
                    </Nav>
                    <Nav>
                        <p className="m-0">© Solentine </p>
                    </Nav>
                </Container>
            </Navbar>
        </div >
    )
}

export default Footer
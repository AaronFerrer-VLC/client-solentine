import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import comercialServices from '../../../services/comercial.services'

const CreateComercialForm = ({ onComercialSaved, onClose }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await comercialServices.createComercial({ name, email, phone })
            onComercialSaved()
            onClose()
        } catch (error) {
            console.error('Error al crear el cliente:', error)
        }
    }

    return (
        <div className='CreateComercialForm'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingrese el email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPhone" className="mt-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Ingrese el teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="dark" type="submit" className="mt-3">
                    Crear
                </Button>
            </Form>
        </div>
    )
}

CreateComercialForm.propTypes = {
    onComercialSaved: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default CreateComercialForm
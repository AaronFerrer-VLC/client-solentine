import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import clientServices from '../../../services/client.services';

const EditClientForm = ({ client, onClientSaved, onClose }) => {
    const [name, setName] = useState(client.name)
    const [email, setEmail] = useState(client.email)
    const [address, setAddress] = useState(client.address)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await clientServices.updateClient(client._id, { name, email, address })
            onClientSaved();
            onClose();
        } catch (error) {
            console.error('Error al editar el cliente:', error);
        }
    }

    return (
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
            <Form.Group controlId="formAddress" className="mt-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese la dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
                Guardar
            </Button>
        </Form>
    );
};

export default EditClientForm;
import React from 'react'
import { Card, Button } from 'react-bootstrap'

const ClientCard = ({ client, onEditClick, onDeleteClick }) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{client.name}</Card.Title>
                <Card.Text>
                    <strong>Email:</strong> {client.email}
                </Card.Text>
                <Card.Text>
                    <strong>Dirección:</strong> {client.address}
                </Card.Text>
                <Button variant="warning" onClick={() => onEditClick(client)}>Editar</Button>
                <Button variant="danger" onClick={() => onDeleteClick(client)} className="ms-2">Eliminar</Button>
            </Card.Body>
        </Card>
    )
}

export default ClientCard
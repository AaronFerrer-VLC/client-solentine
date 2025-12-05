import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'

const CardComercial = ({ comercial, onEditClick, onDeleteClick }) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{comercial.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{comercial.email}</Card.Subtitle>
                <Card.Text>{comercial.phone}</Card.Text>
                <Button variant="warning" onClick={() => onEditClick(comercial)}>Editar</Button>
                <Button variant="danger" onClick={() => onDeleteClick(comercial)} className="ms-2">Eliminar</Button>
            </Card.Body>
        </Card>
    )
}

CardComercial.propTypes = {
    comercial: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        phone: PropTypes.string,
    }).isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
}

export default CardComercial
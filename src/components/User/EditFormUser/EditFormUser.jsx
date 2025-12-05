import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Alert } from 'react-bootstrap'
import userServices from '../../../services/user.services'
import rolesServices from '../../../services/roles.services'

const EditFormUser = ({ userData, onClose }) => {
    const [formData, setFormData] = useState({
        username: userData.username || '',
        email: userData.email || '',
        role: userData.role || '',
        avatar: userData.avatar || '',
    })
    const [roles, setRoles] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        rolesServices.getRoles()
            .then(response => setRoles(response.data))
            .catch(() => setError('Error fetching roles.'))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFileChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('username', formData.username);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('role', formData.role);
        if (formData.avatar) {
            formDataToSend.append('avatar', formData.avatar);
        }

        userServices
            .editUser(userData._id, formDataToSend)
            .then(() => {
                setSuccess('Perfil actualizado correctamente.');
                setError(null);
                onClose();
            })
            .catch(() => {
                setError('Error actualizando el perfil.');
                setSuccess(null);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form.Group controlId="formUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formRole">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAvatar">
                <Form.Label>Foto de perfil</Form.Label>
                <Form.Control
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Guardar cambios
            </Button>
        </Form>
    );
};

EditFormUser.propTypes = {
    userData: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.string,
        avatar: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EditFormUser;
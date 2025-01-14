import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import authServices from '../../../services/auth.services'
import uploadServices from '../../../services/upload.services'
import rolesServices from '../../../services/roles.services'
import Loader from '../../Loader/Loader'

const SignupForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isloading, setIsLoading] = useState(false)

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
        firstName: '',
        familyName: '',
        role: '',
    });

    const [roles, setRoles] = useState([])

    useEffect(() => {
        rolesServices.getRoles()
            .then(res => setRoles(res.data))
            .catch(err => console.log(err))
    }, []);

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setSignupData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleUpload = e => {
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...prevData, avatar: res.data.cloudinary_url });
            })
            .catch(err => console.log(err))
    }

    const handleFormSubmit = e => {
        e.preventDefault();

        authServices
            .signupUser(signupData)
            .then(() => navigate('/inicio-sesion'))
            .catch(err => {
                console.log(err)
                setError(err.response?.data?.message || "Error al registrar usuario");
            })
    }

    return (
        isloading ? <Loader /> :
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control type="text" name="username" value={signupData.username} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={signupData.email} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" name="password" value={signupData.password} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="avatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" onChange={handleUpload} />
                </Form.Group>

                <Form.Group controlId="firstName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="firstName" value={signupData.firstName} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="familyName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name="familyName" value={signupData.familyName} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formRole">
                    <Form.Label>Rol</Form.Label>
                    <Form.Control
                        as="select"
                        name="role"
                        value={signupData.role}
                        onChange={handleInputChange}
                        required
                    >
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}

                <Button className='mt-2' variant="dark" type="submit">Registrarse</Button>
            </Form>
    )
}

export default SignupForm
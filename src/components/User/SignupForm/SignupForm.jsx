import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import authServices from '../../../services/auth.services'
import uploadServices from '../../../services/upload.services'
import rolesServices from '../../../services/roles.services'
import { validateEmail, validatePassword, validateUsername } from '../../../utils/validators'
import { handleApiError } from '../../../utils/errorHandler'
import Loader from '../../Loader/Loader'
import ErrorAlert from '../../ErrorAlert/ErrorAlert'
import SuccessAlert from '../../SuccessAlert/SuccessAlert'

const SignupForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
        firstName: '',
        familyName: '',
        role: 'user',
    });

    const [errors, setErrors] = useState({})
    const [roles, setRoles] = useState([])

    useEffect(() => {
        rolesServices.getRoles()
            .then(res => setRoles(res.data))
            .catch(err => console.error('Error loading roles:', err))
    }, []);

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setSignupData(prevData => ({ ...prevData, [name]: value }));
        
        // Clear error for this field when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: null })
        }
        if (error) {
            setError(null)
        }
    };

    const handleUpload = async e => {
        const file = e.target.files[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Por favor selecciona un archivo de imagen válido')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('La imagen debe ser menor a 5MB')
            return
        }

        setIsUploading(true)
        const formData = new FormData()
        formData.append('imageData', file)

        try {
            const res = await uploadServices.uploadimage(formData)
            setSignupData(prevData => ({ ...prevData, avatar: res.data.cloudinary_url }))
            setSuccess('Imagen subida correctamente')
        } catch (err) {
            const errorMessage = handleApiError(err, 'Error al subir la imagen')
            setError(errorMessage)
        } finally {
            setIsUploading(false)
        }
    }

    const validateForm = () => {
        const newErrors = {}
        
        const usernameError = validateUsername(signupData.username)
        if (usernameError) newErrors.username = usernameError
        
        const emailError = validateEmail(signupData.email)
        if (emailError) newErrors.email = emailError
        
        const passwordError = validatePassword(signupData.password)
        if (passwordError) newErrors.password = passwordError
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleFormSubmit = async e => {
        e.preventDefault();

        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            await authServices.signupUser(signupData)
            setSuccess('Usuario registrado correctamente. Redirigiendo...')
            setTimeout(() => {
                navigate('/inicio-sesion')
            }, 1500)
        } catch (err) {
            const errorMessage = handleApiError(err, 'Error al registrar usuario')
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <Loader text="Registrando usuario..." />
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            {error && (
                <ErrorAlert 
                    message={error} 
                    onClose={() => setError(null)}
                    className="mb-3"
                />
            )}
            
            {success && (
                <SuccessAlert 
                    message={success} 
                    onClose={() => setSuccess(null)}
                    className="mb-3"
                />
            )}

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario *</Form.Label>
                <Form.Control 
                    type="text" 
                    name="username" 
                    value={signupData.username} 
                    onChange={handleInputChange}
                    isInvalid={!!errors.username}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.username}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email *</Form.Label>
                <Form.Control 
                    type="email" 
                    name="email" 
                    value={signupData.email} 
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña *</Form.Label>
                <Form.Control 
                    type="password" 
                    name="password" 
                    value={signupData.password} 
                    onChange={handleInputChange}
                    isInvalid={!!errors.password}
                    required
                />
                <Form.Text className="text-muted">
                    Mínimo 8 caracteres, debe incluir mayúsculas, minúsculas y números
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar {isUploading && <Loader size="sm" />}</Form.Label>
                <Form.Control 
                    type="file" 
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={isUploading}
                />
                {signupData.avatar && (
                    <Form.Text className="text-success">
                        ✓ Imagen seleccionada
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                    type="text" 
                    name="firstName" 
                    value={signupData.firstName} 
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="familyName">
                <Form.Label>Apellido</Form.Label>
                <Form.Control 
                    type="text" 
                    name="familyName" 
                    value={signupData.familyName} 
                    onChange={handleInputChange}
                />
            </Form.Group>

            {roles.length > 0 && (
                <Form.Group className="mb-3" controlId="formRole">
                    <Form.Label>Rol</Form.Label>
                    <Form.Control
                        as="select"
                        name="role"
                        value={signupData.role}
                        onChange={handleInputChange}
                    >
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            )}

            <div className="d-grid">
                <Button 
                    className="btn-style-2 mt-2" 
                    variant="primary" 
                    type="submit"
                    disabled={isLoading || isUploading}
                >
                    {isLoading ? 'Registrando...' : 'Registrarse'}
                </Button>
            </div>
        </Form>
    )
}

export default SignupForm
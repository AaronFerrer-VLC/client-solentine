import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/auth.context"
import authServices from "../../../services/auth.services"
import { validateEmail, validateRequired } from "../../../utils/validators"
import { handleApiError } from "../../../utils/errorHandler"
import Loader from "../../Loader/Loader"
import ErrorAlert from "../../ErrorAlert/ErrorAlert"

const LoginForm = () => {
    const navigate = useNavigate()
    const { authenticateUser } = useContext(AuthContext)

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
        
        // Clear error for this field when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: null })
        }
        if (error) {
            setError(null)
        }
    }

    const validateForm = () => {
        const newErrors = {}
        
        const emailError = validateEmail(loginData.email)
        if (emailError) newErrors.email = emailError
        
        const passwordError = validateRequired(loginData.password, 'Password')
        if (passwordError) newErrors.password = passwordError
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async e => {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const { data } = await authServices.loginUser(loginData)
            
            const { authToken, userId } = data

            localStorage.setItem('authToken', authToken)
            if (userId) {
                localStorage.setItem('userId', userId)
            }

            await authenticateUser()
            navigate('/')
        } catch (err) {
            const errorMessage = handleApiError(err, 'Error al iniciar sesión')
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <Loader text="Iniciando sesión..." />
    }

    return (
        <div className="LoginForm">
            <Form onSubmit={handleSubmit}>
                {error && (
                    <ErrorAlert 
                        message={error} 
                        onClose={() => setError(null)}
                        className="mb-3"
                    />
                )}

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        value={loginData.email} 
                        onChange={handleInputChange} 
                        name="email"
                        isInvalid={!!errors.email}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password" 
                        value={loginData.password} 
                        onChange={handleInputChange} 
                        name="password"
                        isInvalid={!!errors.password}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                    <Button 
                        variant="primary" 
                        type="submit"
                        disabled={isLoading}
                        className="btn-style-2"
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Acceder'}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default LoginForm
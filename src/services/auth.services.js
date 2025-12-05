import axios from 'axios';

class AuthServices {
    constructor() {
        const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://server-solentine.fly.dev';
        this.axiosApp = axios.create({
            baseURL: `${apiUrl}/api/auth`
        });

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`;
            }
            return config;
        });

        this.axiosApp.interceptors.response.use(
            response => response,
            error => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    console.error("Error de autenticación. El token puede haber expirado.");
                    localStorage.removeItem('authToken');
                    window.location.reload();
                }
                return Promise.reject(error);
            }
        );
    }

    async signupUser(userData) {
        try {
            const response = await this.axiosApp.post('/signup', userData);
            return response;
        } catch (error) {
            console.error("Error al registrar usuario:", error.response || error);
            throw error;
        }
    }

    async loginUser(userData) {
        try {
            const response = await this.axiosApp.post('/login', userData);
            return response;
        } catch (error) {
            console.error("Error al iniciar sesión:", error.response || error);
            throw error;
        }
    }

    async verifyUser(token) {
        try {
            const response = await this.axiosApp.get('/verify', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error("Error al verificar el usuario:", error.response || error);
            throw error;
        }
    }
}

export default new AuthServices();

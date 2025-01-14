import axios from 'axios';

class ClientServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/clients`
        });

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`;
            }
            return config;
        });
    }

    getAllClients() {
        return this.axiosApp.get('/');
    }

    createClient(clientData) {
        return this.axiosApp.post('/', clientData);
    }

    updateClient(id, clientData) {
        return this.axiosApp.put(`/${id}`, clientData);
    }

    deleteClient(id) {
        return this.axiosApp.delete(`/${id}`);
    }
}

export default new ClientServices();
import axios from 'axios';

class ZoneServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/zones`
        });

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`;
            }
            return config;
        });
    }

    getAllZones() {
        return this.axiosApp.get('/');
    }

    createZone(zoneData) {
        return this.axiosApp.post('/', zoneData);
    }

    updateZone(id, zoneData) {
        return this.axiosApp.put(`/${id}`, zoneData);
    }

    deleteZone(id) {
        return this.axiosApp.delete(`/${id}`);
    }
}

export default new ZoneServices();
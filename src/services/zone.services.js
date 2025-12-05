import axios from 'axios';

class ZoneServices {
    constructor() {
        const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://server-solentine.fly.dev';
        this.axiosApp = axios.create({
            baseURL: `${apiUrl}/api/zones`
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
import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

class GeocodingService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${apiUrl}/api`
        });
    }

    async getCoordinates(address) {
        try {
            const response = await this.axiosApp.get(`/geocoding/coordinates`, {
                params: { address }
            });
            return response.data;
        } catch (error) {
            console.error(`Error al obtener coordenadas: ${error.message}`, error.response?.data);
            throw new Error('No se pudieron obtener las coordenadas');
        }
    }
}

export default new GeocodingService();
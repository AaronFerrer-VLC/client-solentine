import axios from 'axios'

class GeocodingService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })
    }

    async getCoordinates(address) {
        try {
            const response = await this.axiosApp.get(`/geocoding/coordinates`, {
                params: { address }
            })

            if (!response.data) {
                throw new Error('No se recibió respuesta válida del servidor')
            }

            return response.data
        } catch (error) {
            console.error(`Error al obtener coordenadas: ${error.message}`)
            throw new Error('No se pudieron obtener las coordenadas')
        }
    }
}

export default new GeocodingService()


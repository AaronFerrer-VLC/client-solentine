import axios from 'axios'

class ComercialServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/comercials`
        });

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken')
            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`
            }
            return config
        })
    }

    getAllComercials() {
        return this.axiosApp.get('/')
    }

    createComercial(comercialData) {
        return this.axiosApp.post('/', comercialData)
    }

    updateComercial(id, comercialData) {
        return this.axiosApp.put(`/${id}`, comercialData)
    }

    deleteComercial(id) {
        return this.axiosApp.delete(`/${id}`)
    }
}

export default new ComercialServices()
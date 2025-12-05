import axios from 'axios'

class RolesServices {
    constructor() {
        const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://server-solentine.fly.dev';
        this.axiosApp = axios.create({
            baseURL: `${apiUrl}/api/roles`
        })
    }

    getRoles() {
        return this.axiosApp.get('/')
    }
}

export default new RolesServices()
import axios from 'axios'

class RolesServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/roles`
        })
    }

    getRoles() {
        return this.axiosApp.get('/')
    }
}

export default new RolesServices()
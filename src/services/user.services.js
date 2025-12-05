import axios from 'axios'

class UserServices {
    constructor() {
        const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://server-solentine.fly.dev';
        this.axiosApp = axios.create({
            baseURL: `${apiUrl}/api/users`
        })

        this.axiosApp.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem('authToken')
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    getAllUsers(page = 1, limit = 10) {
        return this.axiosApp.get(`/?page=${page}&limit=${limit}`)
    }

    getAllUsersPopulated() {
        return this.axiosApp.get(`/detailed`)
    }

    getUser(userId) {
        return this.axiosApp.get(`/${userId}`)
    }

    filterUsers(query) {
        return this.axiosApp.get(`/search/${query}`)
    }

    editUser(userId, userData) {
        console.log("Editing user with ID:", userId)
        return this.axiosApp.put(`/${userId}`, userData)
    }

    deleteUser(userId) {
        return this.axiosApp.delete(`/${userId}`);
    }
}

export default new UserServices()
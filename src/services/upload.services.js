import axios from 'axios'

class UploadServices {

    constructor() {
        const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://server-solentine.fly.dev';
        this.api = axios.create({
            baseURL: `${apiUrl}/api/upload`
        })
    }

    uploadimage(imageForm) {
        return this.api.post('/image', imageForm)
    }
}

export default new UploadServices()
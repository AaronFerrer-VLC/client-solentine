import axios from 'axios';

class BrandServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/brands`
        });

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`;
            }
            return config;
        });
    }

    getAllBrands() {
        return this.axiosApp.get('/');
    }

    createBrand(brandData) {
        return this.axiosApp.post('/', brandData);
    }

    updateBrand(id, brandData) {
        return this.axiosApp.put(`/${id}`, brandData);
    }

    deleteBrand(id) {
        return this.axiosApp.delete(`/${id}`);
    }
}

export default new BrandServices();
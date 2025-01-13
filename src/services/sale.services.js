import axios from 'axios'

class SaleServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/sales`
        })

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken')
            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`
            }
            return config
        })
    }

    getAllSales(page, limit, filters, sortOrder) {
        return this.axiosApp.get('/', {
            params: { page, limit, ...filters, sortOrder }
        })
    }

    filterSales(filters, sortOrder, page, limit) {
        return this.axiosApp.get('/filter', {
            params: { ...filters, sortOrder, page, limit }
        })
    }

    createSale(saleData) {
        return this.axiosApp.post('/', saleData)
    }

    editSale(id, saleData) {
        return this.axiosApp.put(`/${id}`, saleData)
    }

    deleteSale(id) {
        return this.axiosApp.delete(`/${id}`)
    }
}

export default new SaleServices()

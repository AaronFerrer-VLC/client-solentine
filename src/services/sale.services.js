import axios from 'axios'

class SaleServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/sales`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config

        })
    }

    getOneSale(id) {
        return this.axiosApp.get(`/${id}`)
    }

    getAllSales() {
        return this.axiosApp.get(`/`)
    }


    filterSales = (query) => {
        return this.axiosApp.get(`/search/${query}`)
    }


    saveSale(saleData) {
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
import axios from 'axios';

class SaleServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api/sales`
        });

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`;
            }
            return config;
        });
    }

    getAllSales(page = 1, limit = 10, filters = {}, sortOrder = { key: 'Fecha', direction: 'asc' }) {
        const query = {
            ...filters,
            sortKey: sortOrder.key,
            sortDirection: sortOrder.direction,
            page,
            limit
        };
        return this.axiosApp.get('/', { params: query });
    }

    getAllSalesForHomePage() {
        return this.axiosApp.get('/all');
    }

    getAllSalesWithoutPagination() {
        return this.axiosApp.get('/all-without-pagination');
    }

    filterSales(filters, sortOrder, page, limit) {
        const query = {
            ...filters,
            sortKey: sortOrder.key,
            sortDirection: sortOrder.direction,
            page,
            limit
        };
        return this.axiosApp.get('/filter', { params: query });
    }

    createSale(saleData) {
        return this.axiosApp.post('/', saleData);
    }

    editSale(id, saleData) {
        return this.axiosApp.put(`/${id}`, saleData);
    }

    deleteSale(id) {
        return this.axiosApp.delete(`/${id}`);
    }
}

export default new SaleServices();

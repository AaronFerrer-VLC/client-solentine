import { useState, useEffect } from 'react';
import ChartsSalesByYear from '../../../components/Charts/ChartsSales/ChartSalesByYear/ChartSalesByYear';
import SaleServices from '../../../services/sale.services';

const PageSalesByYear = () => {
    const [filter, setFilter] = useState('year');
    const [year, setYear] = useState(new Date().getFullYear());
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState({ key: 'Fecha', direction: 'asc' });

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await SaleServices.getAllSalesWithoutPagination();
                console.log('Sales data fetched:', response.data.sales); // Debugging information
                let salesData = [];
                if (filter === 'year') {
                    salesData = response.data.sales.reduce((acc, sale) => {
                        const year = sale.Año;
                        if (!acc[year]) {
                            acc[year] = { year, sales: 0 };
                        }
                        acc[year].sales += sale.Importe;
                        return acc;
                    }, {});
                } else if (filter === 'month') {
                    salesData = response.data.sales.reduce((acc, sale) => {
                        if (sale.Año === year) {
                            const month = sale.Mes;
                            if (!acc[month]) {
                                acc[month] = { month, sales: 0 };
                            }
                            acc[month].sales += sale.Importe;
                        }
                        return acc;
                    }, {});
                } else if (filter === 'date') {
                    salesData = response.data.sales.reduce((acc, sale) => {
                        if (sale.Año === year) {
                            const date = sale.Fecha;
                            if (!acc[date]) {
                                acc[date] = { date, sales: 0 };
                            }
                            acc[date].sales += sale.Importe;
                        }
                        return acc;
                    }, {});
                }
                console.log('Processed sales data:', salesData); // Debugging information
                setData(Object.values(salesData));
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, [filter, year, sortOrder]);

    return (
        <div className='PageSalesByYear'>
            <h1>Dashboard de Ventas</h1>
            <div>
                <label>Filtrar por: </label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="year">Año</option>
                    <option value="month">Mes</option>
                    <option value="date">Fecha</option>
                </select>
                {filter !== 'year' && (
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value, 10))}
                        placeholder="Año"
                    />
                )}
            </div>
            <ChartsSalesByYear data={data} filter={filter} />
        </div>
    );
};

export default PageSalesByYear;
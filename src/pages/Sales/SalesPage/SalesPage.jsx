import React, { useEffect, useState } from 'react'
import TableSales from "../../../components/Sales/TableSales/TableSales"
import saleServices from '../../../services/sale.services'

const SalesPage = () => {
    const [salesData, setSalesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const { data } = await saleServices.getAllSales()
                setSalesData(data)
                setLoading(false)
            } catch (err) {
                console.error(err)
                setError('Hubo un problema al cargar los datos.')
                setLoading(false)
            }
        }

        fetchSales()
    }, [])

    if (loading) return <p>Cargando datos...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="SalesPage">
            <h1>Ventas de Solentine</h1>
            <TableSales datos={salesData} />
        </div>
    );
};

export default SalesPage;

import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components and scales
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartsSalesByYear = ({ data, filter }) => {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const labels = data.map(item => {
        if (filter === 'year') return item.year;
        if (filter === 'month') return `Mes ${item.month}`;
        if (filter === 'date') return item.date;
        return '';
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: `Ventas por ${filter === 'year' ? 'Año' : filter === 'month' ? 'Mes' : 'Fecha'}`,
                data: data.map(item => item.sales),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} />;
};

ChartsSalesByYear.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            year: PropTypes.number,
            month: PropTypes.number,
            date: PropTypes.string,
            sales: PropTypes.number,
        })
    ).isRequired,
    filter: PropTypes.oneOf(['year', 'month', 'date']).isRequired,
};

export default ChartsSalesByYear;
import PropTypes from 'prop-types'
import ClientCard from '../ClientCard/ClientCard'

import './ClientList.css'

const ClientList = ({ clients, onEditClick, onDeleteClick }) => {
    return (
        <div className="ListClient">
            {clients.map(client => (
                <ClientCard
                    key={client._id}
                    client={client}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                />
            ))}
        </div>
    )
}

ClientList.propTypes = {
    clients: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string,
            address: PropTypes.string,
        })
    ).isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
}

export default ClientList
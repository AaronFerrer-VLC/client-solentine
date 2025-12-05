import PropTypes from 'prop-types'
import ComercialCard from '../CardComercial/CardComercial'

const ListComercials = ({ comercials, onEditClick, onDeleteClick }) => {
    return (
        <div className="ListComercials">
            {comercials.map(comercial => (
                <ComercialCard
                    key={comercial._id}
                    comercial={comercial}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                />
            ))}
        </div>
    )
}

ListComercials.propTypes = {
    comercials: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string,
            phone: PropTypes.string,
        })
    ).isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
}

export default ListComercials
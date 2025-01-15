import React from 'react'
import ComercialCard from '../CardComercial/CardComercial'
import Loader from '../../Loader/Loader'

const ListComercials = ({ comercials, onEditClick, onDeleteClick }) => {
    const isLoading = false
    return (
        isLoading ? <Loader /> :
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
export default ListComercials
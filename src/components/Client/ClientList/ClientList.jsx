import React from 'react'
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
export default ClientList
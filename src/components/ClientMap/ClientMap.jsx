import { useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useGoogleMaps } from '../../contexts/GoogleMapsContext';
import { Alert } from 'react-bootstrap';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 39.57299,
    lng: 2.65586
};

const ClientMarker = ({ marker, onClick }) => (
    <Marker
        position={marker.position}
        onClick={() => onClick(marker)}
    />
);

ClientMarker.propTypes = {
    marker: PropTypes.shape({
        id: PropTypes.string.isRequired,
        position: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const ClientInfoWindow = ({ client, onClose }) => (
    <InfoWindow
        position={client.position}
        onCloseClick={onClose}
    >
        <div>
            <h6>{client.name}</h6>
            <p>{client.address}</p>
        </div>
    </InfoWindow>
);

ClientInfoWindow.propTypes = {
    client: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string,
        position: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

/**
 * Componente de mapa de clientes
 * 
 * IMPORTANTE: Este componente usa el GoogleMapsProvider para evitar
 * cargar el script de Google Maps múltiples veces.
 * 
 * El script se carga una sola vez a nivel de aplicación, reduciendo
 * costes y mejorando el rendimiento.
 */
const ClientMap = ({ markers }) => {
    const [selectedClient, setSelectedClient] = useState(null);
    const { isLoaded, loadError } = useGoogleMaps();

    // Asegurar que markers siempre sea un array
    const safeMarkers = Array.isArray(markers) ? markers : [];

    // Si hay error al cargar, mostrar mensaje amigable
    if (loadError) {
        return (
            <Alert variant="warning" className="m-3">
                <Alert.Heading>Mapa no disponible</Alert.Heading>
                <p>{loadError.userMessage || 'No se pudo cargar el mapa. Inténtalo más tarde.'}</p>
            </Alert>
        );
    }

    // Si aún no está cargado, mostrar loading
    if (!isLoaded) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={containerStyle}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando mapa...</span>
                </div>
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={safeMarkers.length > 0 ? 10 : 8}
            options={{
                disableDefaultUI: true,
                zoomControl: true,
            }}
        >
            {safeMarkers.length === 0 && (
                <div className="text-center" style={{ padding: '10px', backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <p>No hay marcadores disponibles para mostrar.</p>
                </div>
            )}
            {safeMarkers.map(marker => {
                if (!marker || !marker.id || !marker.position) return null;
                return (
                    <ClientMarker
                        key={marker.id}
                        marker={marker}
                        onClick={setSelectedClient}
                    />
                );
            })}
            {selectedClient && (
                <ClientInfoWindow
                    client={selectedClient}
                    onClose={() => setSelectedClient(null)}
                />
            )}
        </GoogleMap>
    );
};

ClientMap.propTypes = {
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            address: PropTypes.string,
            position: PropTypes.shape({
                lat: PropTypes.number.isRequired,
                lng: PropTypes.number.isRequired,
            }).isRequired,
        })
    ),
};

export default ClientMap;

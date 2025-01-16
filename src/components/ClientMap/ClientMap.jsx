import { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';
import axios from 'axios';

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

const ClientMap = ({ markers }) => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/geocoding/apikey`);
                setApiKey(response.data.apiKey);
            } catch (error) {
                console.error('Error fetching API key:', error);
            }
        };

        fetchApiKey();
    }, []);

    return (
        apiKey && (
            <LoadScript googleMapsApiKey={apiKey} onLoad={() => console.log('Google Maps API loaded')} onError={(e) => console.error('Error loading Google Maps API', e)}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                    }}
                >
                    {markers.length === 0 && (
                        <div className="text-center" style={{ padding: '10px', backgroundColor: 'white' }}>
                            <p>No hay marcadores disponibles para mostrar.</p>
                        </div>
                    )}
                    {markers.map(marker => (
                        <ClientMarker
                            key={marker.id}
                            marker={marker}
                            onClick={setSelectedClient}
                        />
                    ))}
                    {selectedClient && (
                        <ClientInfoWindow
                            client={selectedClient}
                            onClose={() => setSelectedClient(null)}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        )
    );
};

export default ClientMap;

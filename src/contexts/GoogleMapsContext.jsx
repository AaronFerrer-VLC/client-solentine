import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { LoadScript } from '@react-google-maps/api';
import { logGoogleMapsError, getUserFriendlyMessage } from '../utils/googleMapsErrors';

const GoogleMapsContext = createContext();

/**
 * Google Maps Provider
 * 
 * Centraliza la carga del script de Google Maps para evitar múltiples cargas
 * y proporciona manejo de errores consistente.
 * 
 * IMPORTANTE: Solo carga el script una vez, incluso si múltiples componentes
 * lo necesitan. Esto reduce costes y mejora el rendimiento.
 */
export const GoogleMapsProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [apiKey] = useState(() => {
    // Leer API key desde variable de entorno
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!key) {
      console.warn('VITE_GOOGLE_MAPS_API_KEY no está configurada en .env');
    }
    return key || '';
  });

  const handleLoad = () => {
    console.log('✅ Google Maps API cargada correctamente');
    setIsLoaded(true);
    setLoadError(null);
  };

  const handleError = (error) => {
    console.error('❌ Error al cargar Google Maps API:', error);
    const errorInfo = logGoogleMapsError(error, 'LoadScript');
    setLoadError(errorInfo);
    setIsLoaded(false);
  };

  // Si no hay API key, no intentar cargar
  if (!apiKey) {
    return (
      <GoogleMapsContext.Provider value={{ isLoaded: false, loadError: { userMessage: 'API key de Google Maps no configurada' } }}>
        <div className="alert alert-warning m-3">
          <strong>Advertencia:</strong> La API key de Google Maps no está configurada.
          Por favor, configura VITE_GOOGLE_MAPS_API_KEY en tu archivo .env
        </div>
        {children}
      </GoogleMapsContext.Provider>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      onLoad={handleLoad}
      onError={handleError}
      loadingElement={<div>Cargando mapas...</div>}
    >
      <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
        {loadError && (
          <div className="alert alert-danger m-3" role="alert">
            <strong>Error en el servicio de mapas:</strong>{' '}
            {getUserFriendlyMessage(loadError)}
            <br />
            <small>
              Si el problema persiste, contacta con el administrador del sistema.
            </small>
          </div>
        )}
        {children}
      </GoogleMapsContext.Provider>
    </LoadScript>
  );
};

/**
 * Hook para usar el contexto de Google Maps
 */
export const useGoogleMaps = () => {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error('useGoogleMaps debe usarse dentro de GoogleMapsProvider');
  }
  return context;
};

GoogleMapsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GoogleMapsContext;


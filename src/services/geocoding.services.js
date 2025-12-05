import axios from 'axios';
import geocodingCache from '../utils/geocodingCache';
import { logGoogleMapsError, getUserFriendlyMessage, detectGoogleMapsError } from '../utils/googleMapsErrors';

const apiUrl = import.meta.env.VITE_APP_API_URL;

/**
 * Servicio de Geocodificación
 * 
 * IMPORTANTE: Este servicio usa cache para evitar geocodificar
 * la misma dirección múltiples veces, reduciendo costes de Google Maps API.
 * 
 * También maneja errores de facturación y cuota de forma amigable.
 */
class GeocodingService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${apiUrl}/api`,
            timeout: 10000 // 10 segundos timeout
        });

        // Interceptor para añadir token de autenticación a todas las peticiones
        this.axiosApp.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Interceptor para manejar errores de autenticación
        this.axiosApp.interceptors.response.use(
            (response) => response,
            (error) => {
                // Si es 401, el token puede haber expirado
                if (error.response?.status === 401) {
                    console.warn('⚠️ Token de autenticación inválido o expirado');
                    // Opcional: redirigir al login o refrescar el token
                }
                return Promise.reject(error);
            }
        );
    }

    /**
     * Obtiene coordenadas de una dirección
     * 
     * @param {string} address - Dirección a geocodificar
     * @param {boolean} useCache - Si usar cache (default: true)
     * @returns {Promise<Object>} - Resultado de geocodificación
     */
    async getCoordinates(address, useCache = true) {
        if (!address || typeof address !== 'string' || address.trim() === '') {
            throw new Error('La dirección es requerida');
        }

        const normalizedAddress = address.trim();

        // Verificar cache primero
        if (useCache && geocodingCache.has(normalizedAddress)) {
            const cached = geocodingCache.get(normalizedAddress);
            console.log(`📍 Cache hit para: ${normalizedAddress}`);
            return cached;
        }

        try {
            const response = await this.axiosApp.get(`/geocoding/coordinates`, {
                params: { address: normalizedAddress }
            });

            const result = response.data;

            // Verificar si hay errores en la respuesta de Google
            if (result.status && result.status !== 'OK' && result.status !== 'ZERO_RESULTS') {
                const error = new Error(result.error_message || `Error: ${result.status}`);
                error.status = result.status;
                throw error;
            }

            // Guardar en cache si la respuesta es válida
            if (useCache && result.status === 'OK' && result.results?.length > 0) {
                geocodingCache.set(normalizedAddress, result);
            }

            return result;
        } catch (error) {
            // Manejar errores específicos de Google Maps
            const googleError = detectGoogleMapsError(error);
            
            if (googleError) {
                logGoogleMapsError(error, 'GeocodingService.getCoordinates');
                
                // Crear error con mensaje amigable
                const friendlyError = new Error(getUserFriendlyMessage(error));
                friendlyError.code = googleError;
                friendlyError.originalError = error;
                throw friendlyError;
            }

            // Error genérico
            console.error(`Error al obtener coordenadas: ${error.message}`, error.response?.data);
            throw new Error('No se pudieron obtener las coordenadas. Inténtalo más tarde.');
        }
    }

    /**
     * Limpia el cache de geocodificación
     */
    clearCache() {
        geocodingCache.clear();
    }

    /**
     * Obtiene estadísticas del cache
     */
    getCacheStats() {
        return geocodingCache.getStats();
    }
}

export default new GeocodingService();
/**
 * Google Maps Error Handler
 * Maneja errores específicos de Google Maps API relacionados con facturación y cuotas
 */

/**
 * Códigos de error de Google Maps API
 */
export const GOOGLE_MAPS_ERROR_CODES = {
  BILLING_NOT_ENABLED: 'BillingNotEnabledMapError',
  OVER_DAILY_LIMIT: 'OVER_DAILY_LIMIT',
  OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
  REQUEST_DENIED: 'REQUEST_DENIED',
  INVALID_REQUEST: 'INVALID_REQUEST',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  ZERO_RESULTS: 'ZERO_RESULTS'
};

/**
 * Mensajes amigables para cada tipo de error
 */
const ERROR_MESSAGES = {
  [GOOGLE_MAPS_ERROR_CODES.BILLING_NOT_ENABLED]: {
    title: 'Servicio de Mapas No Disponible',
    message: 'El servicio de mapas no está disponible en este momento. Por favor, contacta con el administrador del sistema.',
    userMessage: 'Los mapas no están disponibles temporalmente. Inténtalo más tarde.',
    action: 'Revisar configuración de facturación en Google Cloud Console'
  },
  [GOOGLE_MAPS_ERROR_CODES.OVER_DAILY_LIMIT]: {
    title: 'Límite Diario Excedido',
    message: 'Se ha excedido el límite diario de uso de Google Maps API.',
    userMessage: 'El servicio de mapas ha alcanzado su límite diario. Inténtalo mañana.',
    action: 'Revisar cuotas en Google Cloud Console o aumentar límites'
  },
  [GOOGLE_MAPS_ERROR_CODES.OVER_QUERY_LIMIT]: {
    title: 'Límite de Consultas Excedido',
    message: 'Se ha excedido el límite de consultas por segundo.',
    userMessage: 'Demasiadas solicitudes. Por favor, espera un momento e inténtalo de nuevo.',
    action: 'Implementar rate limiting o reducir frecuencia de consultas'
  },
  [GOOGLE_MAPS_ERROR_CODES.REQUEST_DENIED]: {
    title: 'Solicitud Denegada',
    message: 'La solicitud a Google Maps API fue denegada. Verifica la API key y las restricciones.',
    userMessage: 'No se pudo cargar el mapa. Inténtalo más tarde.',
    action: 'Verificar API key y restricciones en Google Cloud Console'
  },
  [GOOGLE_MAPS_ERROR_CODES.INVALID_REQUEST]: {
    title: 'Solicitud Inválida',
    message: 'La solicitud a Google Maps API es inválida.',
    userMessage: 'Error al procesar la solicitud. Verifica los datos e inténtalo de nuevo.',
    action: 'Revisar parámetros de la solicitud'
  },
  [GOOGLE_MAPS_ERROR_CODES.ZERO_RESULTS]: {
    title: 'Sin Resultados',
    message: 'No se encontraron resultados para la dirección proporcionada.',
    userMessage: 'No se encontraron resultados para esta dirección.',
    action: 'Verificar que la dirección sea correcta'
  },
  default: {
    title: 'Error en el Servicio de Mapas',
    message: 'Ha ocurrido un error desconocido con el servicio de mapas.',
    userMessage: 'Ha habido un problema con el servicio de mapas. Inténtalo más tarde.',
    action: 'Revisar logs del servidor y configuración de Google Maps'
  }
};

/**
 * Detecta el tipo de error de Google Maps
 */
export const detectGoogleMapsError = (error) => {
  if (!error) return null;

  const errorString = error.toString() || '';
  const errorMessage = error.message || '';
  const errorCode = error.code || error.status || '';

  // Buscar código de error en el mensaje
  for (const [, codeValue] of Object.entries(GOOGLE_MAPS_ERROR_CODES)) {
    if (
      errorString.includes(codeValue) ||
      errorMessage.includes(codeValue) ||
      errorCode === codeValue
    ) {
      return codeValue;
    }
  }

  // Buscar en response.data si existe
  if (error.response?.data?.error_message) {
    const errorMsg = error.response.data.error_message;
    for (const [, codeValue] of Object.entries(GOOGLE_MAPS_ERROR_CODES)) {
      if (errorMsg.includes(codeValue)) {
        return codeValue;
      }
    }
  }

  // Buscar status de error de geocoding
  if (error.response?.data?.status) {
    const status = error.response.data.status;
    if (status === 'OVER_QUERY_LIMIT') return GOOGLE_MAPS_ERROR_CODES.OVER_QUERY_LIMIT;
    if (status === 'REQUEST_DENIED') return GOOGLE_MAPS_ERROR_CODES.REQUEST_DENIED;
    if (status === 'INVALID_REQUEST') return GOOGLE_MAPS_ERROR_CODES.INVALID_REQUEST;
    if (status === 'ZERO_RESULTS') return GOOGLE_MAPS_ERROR_CODES.ZERO_RESULTS;
  }

  return null;
};

/**
 * Obtiene mensaje amigable para el usuario
 */
export const getUserFriendlyMessage = (error) => {
  const errorCode = detectGoogleMapsError(error);
  const errorInfo = errorCode 
    ? ERROR_MESSAGES[errorCode] 
    : ERROR_MESSAGES.default;
  
  return errorInfo.userMessage;
};

/**
 * Obtiene información completa del error (para logging)
 */
export const getErrorInfo = (error) => {
  const errorCode = detectGoogleMapsError(error);
  const errorInfo = errorCode 
    ? ERROR_MESSAGES[errorCode] 
    : ERROR_MESSAGES.default;
  
  return {
    code: errorCode,
    ...errorInfo,
    originalError: error
  };
};

/**
 * Log del error con información útil para debugging
 */
export const logGoogleMapsError = (error, context = '') => {
  const errorInfo = getErrorInfo(error);
  
  console.error(`[Google Maps Error${context ? ` - ${context}` : ''}]`, {
    code: errorInfo.code,
    title: errorInfo.title,
    message: errorInfo.message,
    action: errorInfo.action,
    originalError: error
  });

  // Si es error de facturación, mostrar instrucciones adicionales
  if (errorInfo.code === GOOGLE_MAPS_ERROR_CODES.BILLING_NOT_ENABLED) {
    console.warn(`
⚠️  ACCIÓN REQUERIDA:
1. Ve a Google Cloud Console: https://console.cloud.google.com/
2. Selecciona tu proyecto
3. Ve a "Facturación" y habilita una cuenta de facturación
4. Asegúrate de que las APIs estén habilitadas:
   - Maps JavaScript API
   - Geocoding API
5. Verifica que la API key esté correctamente configurada
    `);
  }

  return errorInfo;
};


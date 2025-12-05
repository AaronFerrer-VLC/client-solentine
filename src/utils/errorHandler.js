/**
 * Centralized Error Handling Utilities
 */

/**
 * Extract error message from error object
 */
export const getErrorMessage = (error) => {
  if (!error) return 'An unexpected error occurred';

  // Axios error
  if (error.response) {
    const { data } = error.response;
    
    // Handle validation errors
    if (data.errors && Array.isArray(data.errors)) {
      return data.errors.map(err => err.message || err).join(', ');
    }
    
    // Handle error message
    if (data.message) {
      return data.message;
    }
    
    // Handle status text
    if (error.response.statusText) {
      return error.response.statusText;
    }
  }
  
  // Network error
  if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
    return 'Network error. Please check your connection.';
  }
  
  // Default error message
  return error.message || 'An unexpected error occurred';
};

/**
 * Handle API errors with user-friendly messages
 */
export const handleApiError = (error, defaultMessage = 'Something went wrong') => {
  if (!error) return defaultMessage;

  // Axios error
  if (error.response) {
    const { data, status } = error.response;
    
    // Handle validation errors (400)
    if (status === 400 && data.errors && Array.isArray(data.errors)) {
      return data.errors.map(err => err.message || `${err.field}: ${err.message || err}`).join(', ');
    }
    
    // Handle conflict errors (409) - user already exists
    if (status === 409) {
      if (data.message) {
        return data.message === 'Email already registered' 
          ? 'Este email ya está registrado' 
          : data.message === 'Username already taken'
          ? 'Este nombre de usuario ya está en uso'
          : data.message;
      }
      return 'Este usuario ya existe';
    }
    
    // Handle authentication errors (401)
    if (status === 401) {
      return data.message || 'Email o contraseña incorrectos';
    }
    
    // Handle server errors (500)
    if (status === 500) {
      return 'Error del servidor. Por favor, intenta más tarde.';
    }
    
    // Handle error message
    if (data.message) {
      return data.message;
    }
    
    // Handle status text
    if (error.response.statusText) {
      return error.response.statusText;
    }
  }
  
  // Network error
  if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
    return 'Error de conexión. Por favor, verifica tu conexión a internet.';
  }
  
  // Default error message
  return error.message || defaultMessage;
};

/**
 * Show error notification (can be integrated with toast library)
 */
export const showError = (error, customMessage = null) => {
  const message = customMessage || getErrorMessage(error);
  // TODO: Integrate with toast notification library
  alert(message); // Temporary - replace with proper toast
  return message;
};

/**
 * Show success notification
 */
export const showSuccess = (message) => {
  // TODO: Integrate with toast notification library
  alert(message); // Temporary - replace with proper toast
};


/**
 * Centralized Error Handling Utilities
 */
import { captureException } from '../config/sentry';

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

  // Capture error in Sentry (only non-operational errors)
  if (error.response?.status >= 500) {
    captureException(error, {
      type: 'api_error',
      status: error.response?.status,
      url: error.config?.url
    });
  }

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
 * Show error notification using toast system
 * @param {Error|string} error - Error object or error message
 * @param {string|null} customMessage - Custom error message to display
 * @param {Function|null} toastCallback - Optional toast callback function (from useToast hook)
 * @returns {string} The error message
 */
export const showError = (error, customMessage = null, toastCallback = null) => {
  const message = customMessage || getErrorMessage(error);
  
  if (toastCallback && typeof toastCallback.showError === 'function') {
    // Use toast notification if callback is provided
    toastCallback.showError(message);
  } else {
    // Fallback to console.error in development, silent in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', message);
    }
  }
  
  return message;
};

/**
 * Show success notification using toast system
 * @param {string} message - Success message to display
 * @param {Function|null} toastCallback - Optional toast callback function (from useToast hook)
 */
export const showSuccess = (message, toastCallback = null) => {
  if (toastCallback && typeof toastCallback.showSuccess === 'function') {
    // Use toast notification if callback is provided
    toastCallback.showSuccess(message);
  } else {
    // Fallback to console.log in development, silent in production
    if (process.env.NODE_ENV === 'development') {
      console.log('Success:', message);
    }
  }
};


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
  const message = getErrorMessage(error);
  console.error('API Error:', error);
  return message || defaultMessage;
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


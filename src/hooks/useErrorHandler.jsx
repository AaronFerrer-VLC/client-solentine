import { useState, useCallback } from 'react';
import { getErrorMessage, handleApiError } from '../utils/errorHandler';

/**
 * Custom hook for error handling
 */
export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleError = useCallback((err, customMessage = null) => {
    const message = customMessage || handleApiError(err);
    setError(message);
    setIsError(true);
    
    // Auto-clear error after 5 seconds
    setTimeout(() => {
      setError(null);
      setIsError(false);
    }, 5000);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setIsError(false);
  }, []);

  return {
    error,
    isError,
    handleError,
    clearError,
    getErrorMessage
  };
};


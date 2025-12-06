import { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from 'react-bootstrap';
import { CheckCircle, XCircle, InfoCircle, ExclamationTriangle } from 'react-bootstrap-icons';

const ToastContext = createContext(null);

/**
 * Toast notification types
 */
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

/**
 * Toast Provider Component
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {string} type - The type of toast (success, error, info, warning)
   * @param {number} duration - Duration in milliseconds (default: 5000)
   */
  const showToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 5000) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      message,
      type,
      duration,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  /**
   * Remove a toast by ID
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Show success toast
   */
  const showSuccess = useCallback((message, duration = 5000) => {
    return showToast(message, TOAST_TYPES.SUCCESS, duration);
  }, [showToast]);

  /**
   * Show error toast
   */
  const showError = useCallback((message, duration = 6000) => {
    return showToast(message, TOAST_TYPES.ERROR, duration);
  }, [showToast]);

  /**
   * Show info toast
   */
  const showInfo = useCallback((message, duration = 5000) => {
    return showToast(message, TOAST_TYPES.INFO, duration);
  }, [showToast]);

  /**
   * Show warning toast
   */
  const showWarning = useCallback((message, duration = 5000) => {
    return showToast(message, TOAST_TYPES.WARNING, duration);
  }, [showToast]);

  /**
   * Get toast variant and icon based on type
   */
  const getToastConfig = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return {
          variant: 'success',
          icon: CheckCircle,
          bg: 'bg-success',
        };
      case TOAST_TYPES.ERROR:
        return {
          variant: 'danger',
          icon: XCircle,
          bg: 'bg-danger',
        };
      case TOAST_TYPES.INFO:
        return {
          variant: 'info',
          icon: InfoCircle,
          bg: 'bg-info',
        };
      case TOAST_TYPES.WARNING:
        return {
          variant: 'warning',
          icon: ExclamationTriangle,
          bg: 'bg-warning',
        };
      default:
        return {
          variant: 'info',
          icon: InfoCircle,
          bg: 'bg-info',
        };
    }
  };

  const value = {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 1055 }}
      >
        {toasts.map((toast) => {
          const config = getToastConfig(toast.type);
          const Icon = config.icon;

          return (
            <Toast
              key={toast.id}
              onClose={() => removeToast(toast.id)}
              show={true}
              delay={toast.duration}
              autohide={toast.duration > 0}
              bg={config.variant}
              className="mb-2"
            >
              <Toast.Header className={`${config.bg} text-white`}>
                <Icon className="me-2" size={20} />
                <strong className="me-auto">
                  {toast.type === TOAST_TYPES.SUCCESS && 'Éxito'}
                  {toast.type === TOAST_TYPES.ERROR && 'Error'}
                  {toast.type === TOAST_TYPES.INFO && 'Información'}
                  {toast.type === TOAST_TYPES.WARNING && 'Advertencia'}
                </strong>
              </Toast.Header>
              <Toast.Body className="text-white">
                {toast.message}
              </Toast.Body>
            </Toast>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

/**
 * Custom hook to use toast notifications
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;


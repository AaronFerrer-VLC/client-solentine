import React from 'react';
import { Alert } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

const ErrorAlert = ({ message, onClose, dismissible = true }) => {
  if (!message) return null;

  return (
    <Alert 
      variant="danger" 
      dismissible={dismissible}
      onClose={onClose}
      className="d-flex align-items-center"
    >
      <XCircle className="me-2" size={20} />
      <span>{message}</span>
    </Alert>
  );
};

export default ErrorAlert;


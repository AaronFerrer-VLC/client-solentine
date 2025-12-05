import PropTypes from 'prop-types';
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

ErrorAlert.propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func,
    dismissible: PropTypes.bool,
};

export default ErrorAlert;


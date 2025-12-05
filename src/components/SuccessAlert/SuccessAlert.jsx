import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { CheckCircle } from 'react-bootstrap-icons';

const SuccessAlert = ({ message, onClose, dismissible = true }) => {
  if (!message) return null;

  return (
    <Alert 
      variant="success" 
      dismissible={dismissible}
      onClose={onClose}
      className="d-flex align-items-center"
    >
      <CheckCircle className="me-2" size={20} />
      <span>{message}</span>
    </Alert>
  );
};

SuccessAlert.propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func,
    dismissible: PropTypes.bool,
};

export default SuccessAlert;


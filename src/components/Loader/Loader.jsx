import PropTypes from 'prop-types'
import { Spinner } from "react-bootstrap"
import './Loader.css'

const Loader = ({ size = 'md', text = null, fullScreen = false }) => {
    const spinnerSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : undefined;
    
    const content = (
        <div className={`Loader ${fullScreen ? 'full-screen' : ''} d-flex flex-column justify-content-center align-items-center`}>
            <Spinner animation="border" role="status" size={spinnerSize} variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            {text && <p className="mt-3 text-muted">{text}</p>}
        </div>
    );

    return content;
}

Loader.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    text: PropTypes.string,
    fullScreen: PropTypes.bool,
}

export default Loader
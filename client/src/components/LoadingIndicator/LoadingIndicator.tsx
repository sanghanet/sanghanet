import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingIndicator.scss';

interface LoadingIndicatorProps {
    until: boolean;
    size?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ until, size }) => {
    return (
        <div className={`loading ${until ? 'd-none' : ''}`}>
            <Spinner
                animation="border"
                className="spinner"
                style={{
                    width: size,
                    height: size
                }}
            />
            <p style={{ fontSize: size }} className="m-0 d-inline">Loading...</p>
        </div>
    );
};

LoadingIndicator.propTypes = {
    until: PropTypes.bool.isRequired,
    size: PropTypes.string
};

export default LoadingIndicator;

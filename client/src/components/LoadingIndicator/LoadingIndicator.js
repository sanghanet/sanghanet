import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingIndicator.scss';

const LoadingIndicator = (props) => {
    return (
        <div className={`loading ${props.until ? 'd-none' : ''}`}>
            <Spinner
                animation="border"
                className="spinner"
                style={{
                    width: props.size,
                    height: props.size
                }}
            />
            <p style={{ fontSize: props.size }} className="m-0 d-inline">Loading...</p>
        </div>
    );
};

LoadingIndicator.propTypes = {
    until: PropTypes.bool.isRequired,
    size: PropTypes.string
};

export default LoadingIndicator;

import React from 'react';
import PropTypes from 'prop-types';

import './InputDisplay.scss';
import { ReactComponent as Edit } from '../formIcons/edit.svg';
import { ReactComponent as Visible } from '../formIcons/visible.svg';
// import { ReactComponent as Invisible } from '../formIcons/invisible.svg';

import { Col } from 'react-bootstrap';

const InputDisplay = (props) => {
    const clickHandler = () => {
        console.log('edit clicked');
    };

    return (
        <Col xm={12} lg={6}>
            <div className="display-container">
                <div className="display-label">
                    <p className="display-title">{props.inputTitle}</p>
                    <button className="display-button visible-button">
                        <Visible className="display-icon visible-icon" />
                    </button>
                </div>
                <div className="display-input">
                    <p className="display-title">{props.inputValue || 'Input Value'}</p>
                    <button className="display-button edit-button" onClick={clickHandler}>
                        <Edit className="display-icon edit-icon" />
                    </button>
                </div>
            </div>
        </Col>
    );
};

InputDisplay.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    inputTitle: PropTypes.string.isRequired,
    inputValue: PropTypes.string
};

export default InputDisplay;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import InputPopup from '../InputPopup/InputPopup';
import './InputDisplay.scss';
import { ReactComponent as Edit } from '../formIcons/edit.svg';
import { ReactComponent as Visible } from '../formIcons/visible.svg';
// import { ReactComponent as Invisible } from '../formIcons/invisible.svg';

import { Col } from 'react-bootstrap';

const InputDisplay = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <InputPopup
                modalShow={show}
                modalTitle={props.inputTitle}
                modalValue={props.inputValue || 'Input Value'}
                modalClose={handleClose}
                modalId={props.inputId}
                modalValueSave={props.inputValueSave}
            />
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
                        <button className="display-button edit-button" onClick={handleShow}>
                            <Edit className="display-icon edit-icon" />
                        </button>
                    </div>
                </div>
            </Col>
        </React.Fragment>
    );
};

InputDisplay.propTypes = {
    inputTitle: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    inputId: PropTypes.string.isRequired,
    inputValueSave: PropTypes.func.isRequired
};

export default InputDisplay;

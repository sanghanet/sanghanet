import React, { useState } from 'react';
import PropTypes from 'prop-types';

import InputPopup from '../InputPopup/InputPopup';
import './InputDisplay.scss';
import { ReactComponent as Edit } from '../formIcons/edit.svg';
import { ReactComponent as Visible } from '../formIcons/visible.svg';
import { ReactComponent as Invisible } from '../formIcons/invisible.svg';

import { Col } from 'react-bootstrap';

const InputDisplay = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {
        inputTitle,
        inputValue,
        inputId,
        inputValueSave,
        inputType,
        inputFieldAs,
        optionsForSelect,
        inputVisibility,
        inputIsVisible,
        toDisable
    } = props;

    return (

        <React.Fragment>
            <InputPopup
                modalShow={show}
                modalTitle={inputTitle}
                modalValue={inputValue || 'Input Value'}
                modalClose={handleClose}
                modalId={inputId}
                modalValueSave={inputValueSave}
                modalInputType={inputType}
                modalInputAs={inputFieldAs}
                options={optionsForSelect}
            />
            <Col xm={12} lg={6}>
                <div className="display-container">
                    <div className="display-label">
                        <p className="display-title">{inputTitle}</p>
                        <button
                            className="display-button visible-button"
                            onClick={ () => inputVisibility(inputId) }
                            disabled ={ toDisable && toDisable.has('visibility') }
                        >
                            {inputIsVisible
                                ? <Visible className="display-icon visible-icon" />
                                : <Invisible className="display-icon visible-icon" />
                            }
                        </button>
                    </div>
                    <div className="display-input">
                        <p className="display-title">{inputValue || 'Enter a new value'}</p>
                        <button
                            className="display-button edit-button"
                            onClick={handleShow}
                            disabled ={ toDisable && toDisable.has('edit') }
                        >
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
    inputValueSave: PropTypes.func,
    inputVisibility: PropTypes.func,
    inputIsVisible: PropTypes.bool.isRequired,
    inputType: PropTypes.string,
    inputFieldAs: PropTypes.string,
    optionsForSelect: PropTypes.array,
    toDisable: PropTypes.instanceOf(Set)
};

export default InputDisplay;

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import InputPopup from '../InputPopup/InputPopup';
import { UIcontext } from '../../contexts/UIcontext/UIcontext';
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
        textForSelect,
        inputVisibility,
        inputVisible,
        toDisable,
        validation,
        format
    } = props;

    const { personalPagePlaceholders } = useContext(UIcontext).dictionary;
    const { ENTERVALUE } = personalPagePlaceholders;

    return (

        <React.Fragment>
            { show
                ? (<InputPopup
                    modalShow={show}
                    modalTitle={inputTitle}
                    modalValue={inputValue}
                    modalClose={handleClose}
                    modalId={inputId}
                    modalValueSave={inputValueSave}
                    modalInputType={inputType}
                    modalInputAs={inputFieldAs}
                    modalOptions={optionsForSelect}
                    modalOptionsText={textForSelect}
                    modalValidation={validation}
                    modalFormat={format}
                    modalPlaceholder={ENTERVALUE}
                />)
                : null
            }
            <Col xm={12} lg={6}>
                <div className="display-container">
                    <div className="display-label">
                        <p className="display-title">{inputTitle}</p>
                        <button
                            className="display-button visible-button"
                            onClick={ () => inputVisibility(inputId) }
                            disabled ={ toDisable && toDisable.has('visibility') }
                        >
                            {inputVisible
                                ? <Visible className="display-icon visible-icon" />
                                : <Invisible className="display-icon visible-icon" />
                            }
                        </button>
                    </div>
                    <div className="display-input">
                        <p className="display-title">{inputValue || ENTERVALUE}</p>
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
    inputVisible: PropTypes.bool.isRequired,
    inputType: PropTypes.string,
    inputFieldAs: PropTypes.string,
    optionsForSelect: PropTypes.array,
    textForSelect: PropTypes.array,
    toDisable: PropTypes.instanceOf(Set),
    validation: PropTypes.object,
    format: PropTypes.string
};

export default InputDisplay;

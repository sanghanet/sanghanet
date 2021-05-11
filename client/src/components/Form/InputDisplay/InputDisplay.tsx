import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import InputPopup from '../InputPopup/InputPopup';
import { UIcontext } from '../../contexts/UIcontext/UIcontext';
import './InputDisplay.scss';
import { ReactComponent as Edit } from '../formIcons/edit.svg';
import { ReactComponent as Visible } from '../formIcons/visible.svg';
import { ReactComponent as Invisible } from '../formIcons/invisible.svg';

import Col from 'react-bootstrap/Col';
import { DisableInput } from '../../../enums/DisableInput';

interface InputDisplayProps {
    inputTitle: string;
    inputValue: string;
    inputId: string;
    inputValueSave: (id: string, value: string) => void;
    inputType?: string;
    inputFieldAsSelect?: boolean;
    optionsForSelect?: Array<string>;
    textForSelect?: Array<string>;
    inputVisibility?: (inputId: string) => void;
    inputVisible: boolean;
    toDisable?: DisableInput;
    validation?: ValidationRuleType;
    format?: string;
};

const InputDisplay: React.FC<InputDisplayProps> = (props) => {
    const {
        inputTitle,
        inputValue,
        inputId,
        inputValueSave,
        inputType,
        inputFieldAsSelect,
        optionsForSelect,
        textForSelect,
        inputVisibility,
        inputVisible,
        toDisable,
        validation,
        format
    } = props;

    const [show, setShow] = useState(false);

    const { personalPagePlaceholders } = useContext(UIcontext).dictionary;
    const { ENTERVALUE } = personalPagePlaceholders;

    return (

        <>
            {show &&
                <InputPopup
                    modalShow={show}
                    modalTitle={inputTitle}
                    modalValue={inputValue}
                    modalClose={(): void => setShow(false)}
                    modalId={inputId}
                    modalValueSave={inputValueSave}
                    modalInputType={inputType}
                    modalInputAsSelect={inputFieldAsSelect}
                    modalOptions={optionsForSelect}
                    modalOptionsText={textForSelect}
                    modalValidation={validation}
                    modalFormat={format}
                    modalPlaceholder={ENTERVALUE}
                />}
            <Col xs={12} lg={6}>
                <div className="display-container">
                    <div className="display-label">
                        <p className="display-title">{inputTitle}</p>
                        <button
                            className="display-button visible-button"
                            onClick={(): void => inputVisibility && inputVisibility(inputId)}
                            disabled={toDisable === DisableInput.Visibility}
                        >
                            {inputVisible
                                ? <Visible className="display-icon visible-icon" />
                                : <Invisible className="display-icon visible-icon" />}
                        </button>
                    </div>
                    <div className="display-input">
                        <p className="display-title">{inputValue || ENTERVALUE}</p>
                        <button
                            className="display-button edit-button"
                            onClick={(): void => setShow(true)}
                            disabled={toDisable === DisableInput.Edit}
                        >
                            <Edit className="display-icon edit-icon" />
                        </button>
                    </div>
                </div>
            </Col>
        </>
    );
};

InputDisplay.propTypes = {
    inputTitle: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    inputId: PropTypes.string.isRequired,
    inputValueSave: PropTypes.func.isRequired,
    inputVisibility: PropTypes.func,
    inputVisible: PropTypes.bool.isRequired,
    inputType: PropTypes.string,
    inputFieldAsSelect: PropTypes.bool,
    optionsForSelect: PropTypes.array,
    textForSelect: PropTypes.array,
    toDisable: PropTypes.oneOf<DisableInput>([DisableInput.Visibility, DisableInput.Edit]),
    validation: PropTypes.object,
    // validation: PropTypes.exact({
    //     required: PropTypes.bool,
    //     minLength: PropTypes.number,
    //     maxLength: PropTypes.number,
    //     pattern: PropTypes.string
    // }),
    format: PropTypes.string
};

export default InputDisplay;

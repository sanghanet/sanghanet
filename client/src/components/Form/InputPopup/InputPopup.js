import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { addYears } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import CustomDateInput from '../CustomDateInput/CustomDateInput';
import { validationError } from '../../ValidationRule';
import { UIcontext } from '../../contexts/UIcontext/UIcontext';

import './InputPopup.scss';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const InputPopup = (props) => {
    const {
        modalShow,
        modalTitle,
        modalValue,
        modalClose,
        modalId,
        modalValueSave,
        modalInputType,
        modalInputAs,
        modalOptions,
        modalOptionsText,
        modalValidation,
        modalFormat,
        modalPlaceholder,
    } = props;

    const currentDate = Date.now();

    const { REQUIREDFORMAT } = useContext(UIcontext).dictionary.personalPagePlaceholders;
    const { REJECT, ACCEPT } = useContext(UIcontext).dictionary.modalButtons;
    const { validationMsg } = useContext(UIcontext).dictionary;

    const [value, setValue] = useState(modalValue);
    const [errorMsg, setErrorMsg] = useState('');

    const validation = (input) => {
        const valErr = validationError(input);
        if (valErr) {
            setErrorMsg(valErr);
            return false;
        } else {
            setErrorMsg('');
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // event.target is the button here
        if (props.modalId !== 'birthday') {
            const input = document.getElementById(modalId); // input field
            if (validation(input)) {
                modalValueSave(modalId, value);
                modalClose();
            };
        } else {
            modalValueSave(modalId, value.toISOString().slice(0, 10));
            modalClose();
        }
    }

    const handleChange = (event) => {
        const input = event.target; // event.target is the input field
        validation(input);
        setValue(input.value);
    }

    const handleDateChange = (date) => {
        setValue(date);
    };

    const handleClose = () => {
        setValue(modalValue);
        modalClose();
    }

    const validateDateValue = (currentValue) => {
        // https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
        if (typeof currentValue === 'string') {
            const convertedToDate = new Date(currentValue);
            if (convertedToDate.toString() !== 'Invalid Date') {
                return convertedToDate;
            } else {
                return new Date('1920-01-01');
            }
        } else {
            return currentValue;
        }
    };

    return (
        /* autoFocus works only if Modal animation={false} */
        <Modal show={modalShow} onHide={handleClose} animation={false} dialogClassName={'modal-container'} className="input-popup">
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Modal.Header closeButton>
                    <Form.Label htmlFor={modalId}>{modalTitle}</Form.Label>
                </Modal.Header>
                <Modal.Body>
                    {modalInputType === 'date'
                        ? <div className="date-picker-container">
                            <DatePicker
                                id="add-dueDate-label"
                                selected={validateDateValue(value)}
                                onChange={handleDateChange}
                                onMonthChange={handleDateChange}
                                onYearChange={handleDateChange}
                                customInput={<CustomDateInput />}
                                className="form-control"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                minDate={addYears(currentDate, -101)}
                                maxDate={addYears(currentDate, -16)}
                                inline
                            />
                        </div>
                        : <>
                            <span className="hint">{REQUIREDFORMAT} {modalFormat}</span>
                            <Form.Control
                                as={modalInputAs}
                                type={modalInputType}
                                id={modalId}
                                value={value}
                                onChange={handleChange}
                                placeholder={modalPlaceholder}
                                autoFocus
                                {...modalValidation}
                            >
                                { modalOptions
                                    ? modalOptions.map((option, index) => {
                                        return (<option value={option} key={index}>{modalOptionsText[index]}</option>);
                                    })
                                    : null
                                }
                            </Form.Control>
                            <span className="error" aria-live="polite">{validationMsg[errorMsg]}</span>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {REJECT}
                    </Button>
                    <Button onClick={handleSubmit}>
                        {ACCEPT}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

InputPopup.propTypes = {
    modalShow: PropTypes.bool.isRequired,
    modalTitle: PropTypes.string,
    modalValue: PropTypes.string,
    modalClose: PropTypes.func.isRequired,
    modalId: PropTypes.string,
    modalValueSave: PropTypes.func,
    modalInputType: PropTypes.string,
    modalInputAs: PropTypes.string,
    modalOptions: PropTypes.array,
    modalOptionsText: PropTypes.array,
    modalValidation: PropTypes.object,
    modalFormat: PropTypes.string,
    modalPlaceholder: PropTypes.string
};

export default InputPopup;

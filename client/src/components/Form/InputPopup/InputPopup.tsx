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

interface InputPopupProps {
    modalShow: boolean,
    modalTitle?: string,
    modalValue: string,
    modalClose: () => void,
    modalId: string,
    modalValueSave: (id: string, value: string) => void,
    modalInputType?: string,
    modalInputAsSelect?: boolean,
    modalOptions?: Array<string>,
    modalOptionsText?: Array<string>,
    modalValidation?: ValidationRuleType,
    modalFormat?: string,
    modalPlaceholder?: string
};

const InputPopup: React.FC<InputPopupProps> = (props) => {
    const {
        modalShow,
        modalTitle,
        modalValue,
        modalClose,
        modalId,
        modalValueSave,
        modalInputType,
        modalInputAsSelect,
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

    const validation = (input: HTMLInputElement) => {
        const valErr = validationError(input);
        if (valErr) {
            setErrorMsg(valErr);
            return false;
        } else {
            setErrorMsg('');
            return true;
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault(); // event.target is the button here
        if (modalId !== 'birthday') {
            //TODO: change to forwardRef ??
            const input: HTMLInputElement = document.getElementById(modalId) as HTMLInputElement; // input field
            if (validation(input)) {
                modalValueSave(modalId, value);
                modalClose();
            };
        } else {
            modalValueSave(modalId, new Date(value).toISOString().slice(0, 10));
            modalClose();
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        validation(input);
        setValue(input.value);
    }

    const handleDateChange = (date: Date) => {
        setValue(new Date(date).toISOString());
    };

    const handleClose = () => {
        setValue(modalValue);
        modalClose();
    }

    const validateDateValue = (currentValue: string) => {
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
                                as={modalInputAsSelect ? 'select' : 'input'}
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
                                        return (<option value={option} key={index}>{modalOptionsText![index]}</option>);
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
    modalValue: PropTypes.string.isRequired,
    modalClose: PropTypes.func.isRequired,
    modalId: PropTypes.string.isRequired,
    modalValueSave: PropTypes.func.isRequired,
    modalInputType: PropTypes.string,
    modalInputAsSelect: PropTypes.bool,
    modalOptions: PropTypes.array,
    modalOptionsText: PropTypes.array,
    modalValidation: PropTypes.object,
    modalFormat: PropTypes.string,
    modalPlaceholder: PropTypes.string
};

export default InputPopup;

import React, { Component } from 'react';
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

class InputPopup extends Component {
    constructor (props) {
        super(props);
        this.currentDate = Date.now();
        this.state = {
            currentValue: this.props.modalValue,
            errorMsg: ''
        };
    }

    validation = (input) => {
        const valErr = validationError(input);
        if (valErr) {
            this.setState({ errorMsg: valErr });
            return false;
        } else {
            this.setState({ errorMsg: '' });
            return true;
        }
    }

    handleSubmit = (event) => {
        event.preventDefault(); // event.target is the button here
        if (this.props.modalId !== 'birthday') {
            const input = document.getElementById(this.props.modalId); // input field
            if (this.validation(input)) {
                this.props.modalValueSave(this.props.modalId, this.state.currentValue);
                this.props.modalClose();
            };
        } else {
            this.props.modalValueSave(this.props.modalId, this.state.currentValue.toISOString().slice(0, 10));
            this.props.modalClose();
        }
    }

    handleChange = (event) => {
        const input = event.target; // event.target is the input field
        this.validation(input);
        this.setState({ currentValue: input.value });
    }

    handleDateChange = (date) => {
        this.setState({ currentValue: date });
    };

    handleClose = () => {
        this.setState({ currentValue: this.props.modalValue });
        this.props.modalClose();
    }

    render () {
        const { modalShow, modalTitle, modalId, modalInputType, modalInputAs, modalOptions, modalOptionsText, modalValidation, modalFormat, modalPlaceholder } = this.props;
        const { currentValue, errorMsg } = this.state;
        const { REQUIREDFORMAT } = this.context.dictionary.personalPagePlaceholders;
        const { REJECT, ACCEPT } = this.context.dictionary.modalButtons;
        const { validationMsg } = this.context.dictionary;
        const currentDate = this.currentDate;

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
            <Modal show={modalShow} onHide={this.handleClose} animation={false} dialogClassName={'modal-container'} className="input-popup">
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Modal.Header closeButton>
                        <Form.Label htmlFor={modalId}>{modalTitle}</Form.Label>
                    </Modal.Header>
                    <Modal.Body>
                        {modalInputType === 'date'
                            ? <div className="date-picker-container">
                                <DatePicker
                                    id="add-dueDate-label"
                                    selected={validateDateValue(currentValue)}
                                    onChange={this.handleDateChange}
                                    onMonthChange={this.handleDateChange}
                                    onYearChange={this.handleDateChange}
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
                                    value={currentValue}
                                    onChange={this.handleChange}
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
                        <Button variant="secondary" onClick={this.handleClose}>
                            {REJECT}
                        </Button>
                        <Button onClick={this.handleSubmit}>
                            {ACCEPT}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
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
    inputArray: PropTypes.array,
    modalValidation: PropTypes.object,
    modalFormat: PropTypes.string,
    modalPlaceholder: PropTypes.string
};

InputPopup.contextType = UIcontext;
export default InputPopup;

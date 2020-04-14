import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputPopup.scss';

import { Modal, Button, Form } from 'react-bootstrap';

class InputPopup extends Component {
    state = {
        currentValue: this.props.modalValue,
        errorMsg: ''
    }

    validation = (input) => {
        if (input.validity.valid) {
            this.setState({ errorMsg: '' }); return true;
        } else if (input.validity.valueMissing) {
            this.setState({ errorMsg: 'Value is required!' });
        } else if (input.validity.typeMismatch) {
            this.setState({ errorMsg: 'Enter a valid input type!' });
        } else if (input.validity.patternMismatch) {
            this.setState({ errorMsg: 'Invalid pattern!' });
        } else if (input.validity.tooLong) {
            this.setState({ errorMsg: 'Too long input!' }); // You will never get this error msg
        } else if (input.validity.tooShort) {
            this.setState({ errorMsg: 'Too short input!' });
        } else if (input.validity.rangeUnderflow) {
            this.setState({ errorMsg: 'Too low number!' });
        } else if (input.validity.rangeOverflow) {
            this.setState({ errorMsg: 'Too big number!' });
        } else if (input.validity.badInput) {
            this.setState({ errorMsg: 'Please enter a number!' });
        }
        return false;
    }

    handleSubmit = (event) => {
        event.preventDefault(); // event.target is the button here
        const input = document.querySelector('.form-control'); // input field
        if (this.validation(input)) {
            this.props.modalValueSave(this.state.currentValue, this.props.modalId);
            this.props.modalClose();
        };
    }

    handleChange = (event) => {
        const input = event.target; // event.target is the input field
        this.validation(input);
        this.setState({ currentValue: input.value });
    }

    handleClose = () => {
        this.setState({ currentValue: this.props.modalValue });
        this.props.modalClose();
    }

    render () {
        const { modalShow, modalTitle, modalId, modalInputType, modalInputAs, modalOptions, modalValidation, modalFormat } = this.props;
        const { currentValue, errorMsg } = this.state;

        return (
            /* autoFocus works only if Modal animation={false} */
            <Modal show={modalShow} onHide={this.handleClose} animation={false} dialogClassName={'modal-container'}>
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Modal.Header closeButton>
                        <Form.Label htmlFor={modalId}>{modalTitle}</Form.Label>
                    </Modal.Header>
                    <Modal.Body>
                        <span className="hint">Required format: {modalFormat}</span>
                        <Form.Control
                            as={modalInputAs}
                            type={modalInputType}
                            id={modalId}
                            value={currentValue}
                            onChange={this.handleChange}
                            autoFocus
                            {...modalValidation}
                        >
                            { modalOptions
                                ? modalOptions.map((option, index) => {
                                    return (<option value={option} key={index}>{option}</option>);
                                })
                                : null
                            }
                        </Form.Control>
                        <span className="error" aria-live="polite">{errorMsg}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit}>
                            Save
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
    inputArray: PropTypes.array,
    modalValidation: PropTypes.object,
    modalFormat: PropTypes.string
};

export default InputPopup;

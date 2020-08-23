import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validationError } from '../../ValidationRule';
import { UIcontext } from '../../contexts/UIcontext/UIcontext';

import './InputPopup.scss';

import { Modal, Button, Form } from 'react-bootstrap';

class InputPopup extends Component {
    state = {
        currentValue: this.props.modalValue,
        errorMsg: ''
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
        const { modalShow, modalTitle, modalId, modalInputType, modalInputAs, modalOptions, modalOptionsText, modalValidation, modalFormat } = this.props;
        const { currentValue, errorMsg } = this.state;
        const { REQUIREDFORMAT } = this.context.dictionary.personalPagePlaceholders;
        const { REJECT, ACCEPT } = this.context.dictionary.modalButtons;
        return (
            /* autoFocus works only if Modal animation={false} */
            <Modal show={modalShow} onHide={this.handleClose} animation={false} dialogClassName={'modal-container'} className="input-popup">
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Modal.Header closeButton>
                        <Form.Label htmlFor={modalId}>{modalTitle}</Form.Label>
                    </Modal.Header>
                    <Modal.Body>
                        <span className="hint">{REQUIREDFORMAT} {modalFormat}</span>
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
                                    return (<option value={option} key={index}>{modalOptionsText[index]}</option>);
                                })
                                : null
                            }
                        </Form.Control>
                        <span className="error" aria-live="polite">{errorMsg}</span>
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
    modalFormat: PropTypes.string
};

InputPopup.contextType = UIcontext;
export default InputPopup;

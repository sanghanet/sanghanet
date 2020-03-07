import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputPopup.scss';

import { Modal, Button, Form } from 'react-bootstrap';

class InputPopup extends Component {
    state = {
        currentValue: this.props.modalValue
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.modalValueSave(this.state.currentValue);
        this.props.modalClose();
    }

    handleChange = (event) => {
        this.setState({ currentValue: event.target.value });
    }

    handleClose = () => {
        this.setState({ currentValue: this.props.modalValue });
        this.props.modalClose();
    }

    render () {
        const { modalShow, modalTitle, modalId, modalInputType, modalInputAs, options } = this.props;

        return (
            /* autoFocus works only if Modal animation={false} */
            <Modal show={modalShow} onHide={this.handleClose} animation={false} dialogClassName={'modal-container'}>
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Modal.Header closeButton>
                        <Form.Label htmlFor={modalId}>{modalTitle}</Form.Label>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            as={modalInputAs}
                            type={modalInputType}
                            id={modalId}
                            value={this.state.currentValue}
                            onChange={this.handleChange}
                            autoFocus
                        >
                            { options
                                ? options.map((option, index) => {
                                    return (<option value={option} key={index}>{option}</option>);
                                })
                                : null
                            }
                        </Form.Control>
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
    modalId: PropTypes.string.isRequired,
    modalValueSave: PropTypes.func.isRequired,
    modalInputType: PropTypes.string,
    modalInputAs: PropTypes.string,
    options: PropTypes.array
};

export default InputPopup;

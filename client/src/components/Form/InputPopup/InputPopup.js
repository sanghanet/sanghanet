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
        const { modalShow, modalTitle, modalId } = this.props;

        return (
            <Modal show={modalShow} onHide={this.handleClose}>
                <Form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Form.Label htmlFor={modalId}>{modalTitle}</Form.Label>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            type='text'
                            id={modalId}
                            value={this.state.currentValue}
                            onChange={this.handleChange}
                            autoFocus
                        ></Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
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
    modalValueSave: PropTypes.func.isRequired
};

export default InputPopup;

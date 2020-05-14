import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validationError } from '../../ValidationRule';

import './BasicDialog.scss';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class BasicDialog extends Component {
    state = {
        randomNumber: Math.floor(1000 + Math.random() * 9000),
        isDisabled: true,
        errorMsg: ''
    }

    validation = (input) => {
        const valErr = validationError(input);
        if (valErr) {
            this.setState({ errorMsg: valErr });
        } else {
            this.setState({ errorMsg: '' });
        }
    }

    handleChange = (event) => {
        const input = event.target;
        this.validation(input);

        const value = parseInt(input.value);
        if (value === this.state.randomNumber) {
            this.setState({ isDisabled: false });
        } else {
            this.setState({ isDisabled: true });
        }
    }

    handleDelete = (event) => {
        this.props.deleteMember();
    }

    handleClose = () => {
        this.props.closeDialog();
    }

    render () {
        const { title, message, user, reject, accept } = this.props;
        const { randomNumber, isDisabled, errorMsg } = this.state;

        return (
            /* autoFocus works only if Modal animation={false} */
            <Modal show={true} onHide={this.handleClose} animation={false} dialogClassName={'modal-container'} className="basic-dialog">
                <Form onSubmit={this.handleDelete} autoComplete='off'>
                    <Modal.Header closeButton>
                        <span>{title}</span>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label htmlFor="digits-label">
                            <span className="msg">{`${message} ${user}? To confirm, enter these four digits:`}&nbsp;</span>
                            <span className="random-no">{randomNumber}</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            id="digits-label"
                            onChange={this.handleChange}
                            min="1000"
                            max="9999"
                            placeholder={user}
                            autoFocus
                        ></Form.Control>
                        <span className="error" aria-live="polite">{errorMsg}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            {reject}
                        </Button>
                        <Button onClick={this.handleDelete} disabled={isDisabled}>
                            {accept}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

BasicDialog.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    user: PropTypes.string,
    reject: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
    closeDialog: PropTypes.func.isRequired,
    deleteMember: PropTypes.func.isRequired
};

export default BasicDialog;

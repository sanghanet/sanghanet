import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BasicDialog.scss';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class BasicDialog extends Component {
    state = {
        showDialog: true,
        randomNumber: null,
        isDisabled: true
    }

    componentDidMount () {
        const fourDigit = Math.floor(1000 + Math.random() * 9000);
        this.setState({ randomNumber: fourDigit });
    }

    handleChange = (event) => {
        const value = parseInt(event.target.value);
        if (value === this.state.randomNumber) {
            this.setState({ isDisabled: false });
        } else {
            this.setState({ isDisabled: true });
        }
    }

    handleSubmit = (event) => {
        console.log('SUBMITED');
    }

    handleClose = () => {
        console.log('CLOSED');
        this.setState({ showDialog: true });
    }

    render () {
        const { title, message, user, reject, accept } = this.props;
        const { randomNumber, isDisabled, showDialog } = this.state;

        return (
            /* autoFocus works only if Modal animation={false} */
            <Modal show={showDialog} onHide={this.handleClose} animation={false} autoFocus dialogClassName={'modal-container'} className="basic-dialog">
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Modal.Header closeButton>
                        <span>{title}</span>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label htmlFor="digits-label">
                            <span>{`${message} ${user}? To confirm, enter these four digits:`}&nbsp;</span>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            {reject}
                        </Button>
                        <Button onClick={this.handleSubmit} disabled={isDisabled}>
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
    accept: PropTypes.string.isRequired
};

export default BasicDialog;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validationError } from '../../../../components/ValidationRule';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';

import './DeleteDialog.scss';

import Form from 'react-bootstrap/Form';

class DeleteDialog extends Component {
    state = {
        randomNumber: Math.floor(1000 + Math.random() * 9000),
        isDisabled: true,
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

    handleChange = (event) => {
        const input = event.target;
        const value = parseInt(input.value);

        if (this.validation(input) && value !== this.state.randomNumber) {
            this.setState({ errorMsg: 'Incorrect number!' });
        };

        if (value === this.state.randomNumber) {
            this.setState({ isDisabled: false });
        } else {
            this.setState({ isDisabled: true });
        }
    }

    handleDelete = (event) => {
        if (!this.state.isDisabled) { this.props.deleteMember(); }
        event.preventDefault();
    }

    render () {
        const { member, closeDialog } = this.props;
        const { randomNumber, isDisabled, errorMsg } = this.state;

        return (
            <GenericDialog
                title = "Delete member"
                reject = 'No'
                accept = 'Delete'
                acceptDisabled = {isDisabled}
                handleClose = {closeDialog}
                handleAccept = {this.handleDelete}
            >
                <Form onSubmit={this.handleDelete} autoComplete='off' className="delete-dialog">
                    <Form.Label htmlFor="digits-label">
                        <span className="msg">Delete&nbsp;</span>
                        <span className="email">{member}</span>
                        <span className="msg">? <br></br>To confirm, enter these four digits:&nbsp;</span>
                        <span className="random-no">{randomNumber}</span>
                    </Form.Label>
                    <Form.Control
                        type="number"
                        id="digits-label"
                        onChange={this.handleChange}
                        min="1000"
                        max="9999"
                        placeholder={member}
                        autoFocus
                    ></Form.Control>
                    <span className="error" aria-live="polite">{errorMsg}</span>
                </Form>
            </GenericDialog>
        );
    }
}

DeleteDialog.propTypes = {
    member: PropTypes.string.isRequired,
    closeDialog: PropTypes.func.isRequired,
    deleteMember: PropTypes.func.isRequired
};

export default DeleteDialog;

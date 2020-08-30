import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validationError } from '../../../../components/ValidationRule';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';

import './DeleteMemberDialog.scss';

import Form from 'react-bootstrap/Form';

class DeleteMemberDialog extends Component {
    static contextType = UIcontext;

    state = {
        randomNumber: Math.floor(1000 + Math.random() * 9000),
        isDisabled: true,
        errorToken: ''
    }

    validation = (input) => {
        const valErr = validationError(input);
        if (valErr) {
            this.setState({ errorToken: valErr });
            return false;
        } else {
            this.setState({ errorToken: '' });
            return true;
        }
    }

    handleChange = (event) => {
        const input = event.target;
        const value = parseInt(input.value);

        if (this.validation(input) && value !== this.state.randomNumber) {
            this.setState({ errorToken: 'WRONGNUMBER' });
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
        const { randomNumber, isDisabled, errorToken } = this.state;
        const { NO, DELETE } = this.context.dictionary.modalButtons;
        const { POPUPDELETEMEMBER, MSGDELETE, CONFIRMDELETE } = this.context.dictionary.superuserDeleteMember;
        const { validationMsg } = this.context.dictionary;
        return (
            <GenericDialog
                title = {POPUPDELETEMEMBER}
                reject = {NO}
                accept = {DELETE}
                acceptDisabled = {isDisabled}
                handleClose = {closeDialog}
                handleAccept = {this.handleDelete}
            >
                <Form onSubmit={this.handleDelete} autoComplete='off' className="delete-dialog">
                    <Form.Label htmlFor="digits-label">
                        <span className="msg">{MSGDELETE}&nbsp;</span>
                        <span className="email">{member}</span>
                        <span className="msg">? <br></br>{CONFIRMDELETE}&nbsp;</span>
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
                    <span className="error" aria-live="polite">{validationMsg[errorToken]}</span>
                </Form>
            </GenericDialog>
        );
    }
}

DeleteMemberDialog.propTypes = {
    member: PropTypes.string.isRequired,
    closeDialog: PropTypes.func.isRequired,
    deleteMember: PropTypes.func.isRequired
};

export default DeleteMemberDialog;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../components/Form/GenericDialog/GenericDialog';

import './AddMemberDialog.scss';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

class DeleteDialog extends Component {
    state = {
        emailInputValue: '',
        labelInputValue: '',
        isDisabled: true,
        errorMsg: ''
    }

    customValidation = () => {
        console.log('validating...');
        const { emailInputValue, labelInputValue } = this.state;
        const errorMsg = emailInputValue.includes('@') ? 'Leave \'@gmail.com\' off' : '';
        const isInvalid = !(!errorMsg.length && emailInputValue.length && labelInputValue.length);
        this.setState({
            isDisabled: isInvalid,
            errorMsg: errorMsg
        });
    }

    handleEmailChange = (event) => {
        this.setState({ emailInputValue: event.target.value }, this.customValidation);
    }

    handleLabelChange = (event) => {
        this.setState({ labelInputValue: event.target.value }, this.customValidation);
    }

    handleAddMember = (event) => {
        this.props.addMember(`${this.state.emailInputValue}@gmail.com`, this.state.labelInputValue);
        event.preventDefault();
    }

    render () {
        const { closeDialog } = this.props;
        const { errorMsg, emailInputValue, labelInputValue, isDisabled } = this.state;

        return (
            <GenericDialog
                title = "Add member"
                reject = 'Cancel'
                accept = 'Add'
                acceptDisabled = {isDisabled}
                handleClose = {closeDialog}
                handleAccept = {this.handleAddMember}
            >
                <Form onSubmit={this.handleAddMember} autoComplete='off' className="add-member-dialog">
                    <Form.Label htmlFor="email-input">Enter email address to add:</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={emailInputValue}
                            id="email-input"
                            onChange={this.handleEmailChange}
                            autoFocus
                        >
                        </Form.Control>
                        <InputGroup.Append>
                            <InputGroup.Text>@gmail.com</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <span className="error" aria-live="polite">{errorMsg}</span>
                    <Form.Label htmlFor="label-input">{'Enter new member\'s temporary name'}</Form.Label>
                    <Form.Control
                        type="text"
                        value={labelInputValue}
                        id="label-input"
                        onChange={this.handleLabelChange}
                    >
                    </Form.Control>
                </Form>
            </GenericDialog>
        );
    }
}

DeleteDialog.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    addMember: PropTypes.func.isRequired
};

export default DeleteDialog;

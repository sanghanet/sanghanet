import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../components/Form/GenericDialog/GenericDialog';

import './AddMemberDialog.scss';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

class DeleteDialog extends Component {
    state = {
        inputValue: '',
        errorMsg: ''
    }

    handleChange = (event) => {
        const value = event.target.value;
        const errorMsg = value.includes('@') ? 'Leave \'@gmail.com\' off' : '';
        this.setState({ inputValue: value, errorMsg: errorMsg });
    }

    handleAddMember = (event) => {
        this.props.addMember(`${this.state.inputValue}@gmail.com`);
        event.preventDefault();
    }

    render () {
        const { closeDialog } = this.props;
        const { errorMsg } = this.state;

        return (
            <GenericDialog
                title = "Add member"
                reject = 'Cancel'
                accept = 'Add'
                handleClose = {closeDialog}
                handleAccept = {this.handleAddMember}
            >
                <Form onSubmit={this.handleAddMember} autoComplete='off' className="delete-dialog">
                    <Form.Label htmlFor="digits-label">
                            Enter email address to add:
                    </Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={this.state.inputValue}
                            id="digits-label"
                            onChange={this.handleChange}
                            autoFocus
                        >
                        </Form.Control>
                        <InputGroup.Append>
                            <InputGroup.Text>@gmail.com</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <span className="error" aria-live="polite">{errorMsg}</span>
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

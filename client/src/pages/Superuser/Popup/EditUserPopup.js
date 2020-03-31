import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './EditUserPopup.scss';

import { Modal, Button, Form } from 'react-bootstrap';

class AddUserPopup extends Component {
    state = {
        selectedRole: this.props.user.isSuperuser ? 'superuser' : 'general user'
    }

    handleClose = () => {
        this.props.modalClose();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.modalClose();
    }

    handleRoleChange = () => {
        console.log('role has been changed');
    }

    render () {
        const { modalShow, user } = this.props;
        const { selectedRole } = this.state;

        return (
            <Modal show={modalShow} onHide={this.handleClose} animation={false} dialogClassName={'modal-container'}>
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Modal.Header closeButton>
                        <Form.Label>{`${user.firstName} ${user.lastName}`}</Form.Label>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label htmlFor='role'>Role</Form.Label>
                        <Form.Control
                            as='select'
                            defaultValue={selectedRole}
                            id='role'
                            type='text'
                            onChange={this.handleRoleChange}
                        >
                            <option>superuser</option>
                            <option>general user</option>
                        </Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={this.handleClose}>
                            Delete user
                        </Button>
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

AddUserPopup.propTypes = {
    modalShow: PropTypes.bool.isRequired,
    modalClose: PropTypes.func.isRequired,
    user: PropTypes.object
};

export default AddUserPopup;

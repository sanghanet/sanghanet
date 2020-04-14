import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

class AddUserPopup extends Component {
    state = {
        currentValue: ''
    }

    handleChange = (event) => {
        this.setState({ currentValue: event.target.value });
    }

    handleClose = () => {
        this.props.modalClose();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.modalClose();
    }

    render () {
        const { modalShow } = this.props;

        return (
            <Modal show={modalShow} onHide={this.handleClose} animation={false} dialogClassName={'modal-container'}>
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Modal.Header closeButton>
                        <Form.Label>Add user</Form.Label>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <Form.Control
                                type='text'
                                value={this.state.currentValue}
                                onChange={this.handleChange}
                                autoFocus
                                placeholder='email address'
                            >
                            </Form.Control>
                            <InputGroup.Append>
                                <InputGroup.Text>@gmail.com</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
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

AddUserPopup.propTypes = {
    modalShow: PropTypes.bool.isRequired,
    modalClose: PropTypes.func.isRequired
};

export default AddUserPopup;

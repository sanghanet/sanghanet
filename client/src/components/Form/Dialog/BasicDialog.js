import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './BasicDialog.scss';

import { Modal, Button, Form } from 'react-bootstrap';

class BasicDialog extends Component {
    // state = {
    //     showDialog: true
    // }

    handleSubmit = (event) => {
        console.log('SUBMITED');
    }

    handleClose = () => {
        console.log('CLOSED');
    }

    render () {
        const { title, message, reject, accept } = this.props;

        return (
            /* autoFocus works only if Modal animation={false} */
            <Modal show={true} onHide={this.handleClose} animation={false} dialogClassName={'modal-container'}>
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Modal.Header closeButton>
                        <span>{title}</span>
                    </Modal.Header>
                    <Modal.Body>
                        <span>{message}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            {reject}
                        </Button>
                        <Button onClick={this.handleSubmit}>
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
    reject: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired
};

export default BasicDialog;

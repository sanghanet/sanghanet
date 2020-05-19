import React from 'react';
import PropTypes from 'prop-types';

import './GenericDialog.scss';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const GenericDialog = (props) => {
    const { title, reject, accept, children, acceptDisabled, handleClose, handleAccept } = props;

    return (
        <Modal show={true} onHide={handleClose} animation={false} dialogClassName={'modal-container'} className="generic-dialog">
            <Modal.Header closeButton>
                <h3>{title}</h3>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {reject}
                </Button>
                <Button onClick={handleAccept} disabled={acceptDisabled}>
                    {accept}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

GenericDialog.propTypes = {
    title: PropTypes.string.isRequired,
    reject: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    acceptDisabled: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    handleAccept: PropTypes.func.isRequired
};

export default GenericDialog;

import React from 'react';
import PropTypes from 'prop-types';

import './GenericDialog.scss';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface GenericDialogProps {
    title: string;
    subtitle?: string;
    reject?: string;
    accept?: string;
    children: React.ReactNode;
    acceptDisabled?: boolean;
    handleClose: () => void;
    handleAccept?: () => void;
};

const GenericDialog: React.FC<GenericDialogProps> = ({ title, subtitle, reject, accept, children, acceptDisabled, handleClose, handleAccept }) => {
    return (
        <Modal show onHide={handleClose} animation={false} dialogClassName="modal-container" className="generic-dialog">
            <Modal.Header closeButton>
                <div>
                    <h3>{title}</h3>
                    <span>{subtitle}</span>
                </div>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {reject}
                </Button>
                {accept &&
                    <Button onClick={handleAccept} disabled={acceptDisabled}>
                        {accept}
                    </Button>}
            </Modal.Footer>
        </Modal>
    );
};

GenericDialog.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    reject: PropTypes.string,
    accept: PropTypes.string,
    children: PropTypes.node,
    acceptDisabled: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    handleAccept: PropTypes.func
};

export default GenericDialog;

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { validationError } from '../../../../components/ValidationRule';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';

import './DeleteMemberDialog.scss';

import Form from 'react-bootstrap/Form';

const  DeleteMemberDialog = ({ member, closeDialog, deleteMember }) => {
    const {
        modalButtons: { NO, DELETE },
        superuserDeleteMember: { POPUPDELETEMEMBER, MSGDELETE, CONFIRMDELETE },
        validationMsg
    } = useContext(UIcontext).dictionary;

    const [randomNumber, resetRandomNumber] = useState(Math.floor(1000 + Math.random() * 9000));
    const [isDisabled, setDisabled] = useState(true);
    const [errorToken, setErrorToken] = useState('');

    const validation = (input) => {
        const valErr = validationError(input);
        if (valErr) {
            setErrorToken(valErr);
            return false;
        } else {
            setErrorToken('');
            return true;
        }
    }

    const handleChange = (event) => {
        const input = event.target;
        const value = parseInt(input.value);

        if (validation(input) && value !== randomNumber) {
            setErrorToken('WRONGNUMBER');
        };

        if (value === randomNumber) {
            setDisabled(false );
        } else {
            setDisabled(true);
        }
    }

    const handleDelete = (event) => {
        if (!isDisabled) deleteMember();
        event.preventDefault();
    }

    return (
        <GenericDialog
            title = {POPUPDELETEMEMBER}
            reject = {NO}
            accept = {DELETE}
            acceptDisabled = {isDisabled}
            handleClose = {closeDialog}
            handleAccept = {handleDelete}
        >
            <Form onSubmit={handleDelete} autoComplete='off' className="delete-dialog">
                <Form.Label htmlFor="digits-label">
                    <span className="msg">{MSGDELETE}&nbsp;</span>
                    <span className="email">{member}</span>
                    <span className="msg">? <br></br>{CONFIRMDELETE}&nbsp;</span>
                    <span className="random-no">{randomNumber}</span>
                </Form.Label>
                <Form.Control
                    type="number"
                    id="digits-label"
                    onChange={handleChange}
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

DeleteMemberDialog.propTypes = {
    member: PropTypes.string.isRequired,
    closeDialog: PropTypes.func.isRequired,
    deleteMember: PropTypes.func.isRequired
};

export default DeleteMemberDialog;

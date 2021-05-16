import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { validationError } from '../../../../components/ValidationRule';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';

import './DeleteMemberDialog.scss';

import Form from 'react-bootstrap/Form';

interface DeleteMemberDialogProps {
    member: string;
    randomNumber: number;
    onCloseDialog: React.MouseEventHandler<HTMLButtonElement>;
    onDeleteMember: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteMemberDialog: React.FC<DeleteMemberDialogProps> = ({ member, randomNumber, onCloseDialog, onDeleteMember }) => {
    const {
        modalButtons: { NO, DELETE },
        superuserDeleteMember: { POPUPDELETEMEMBER, MSGDELETE, CONFIRMDELETE },
        validationMsg
    } = useContext(UIcontext).dictionary;

    const [isDisabled, setDisabled] = useState(true);
    const [errorToken, setErrorToken] = useState('');

    const validate = (input: EventTarget & HTMLInputElement): boolean => {
        const valErr = validationError(input);
        if (valErr) {
            setErrorToken(valErr);
            return false;
        } else {
            setErrorToken('');
            return true;
        }
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const input = event.target;
        const value = parseInt(input.value);

        if (validate(input) && value !== randomNumber) {
            setErrorToken('WRONGNUMBER');
        };

        if (value === randomNumber) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        !isDisabled && onDeleteMember(event);
        event.preventDefault();
    };

    return (
        <GenericDialog
            title={POPUPDELETEMEMBER}
            reject={NO}
            accept={DELETE}
            acceptDisabled={isDisabled}
            handleClose={onCloseDialog}
            handleAccept={handleDelete}
        >
            <Form autoComplete="off" className="delete-dialog">
                <Form.Label htmlFor="digits-label">
                    <span className="msg">{MSGDELETE}&nbsp;</span>
                    <span className="email">{member}</span>
                    <span className="msg">? <br />{CONFIRMDELETE}&nbsp;</span>
                    <span className="random-no">{randomNumber}</span>
                </Form.Label>
                <Form.Control
                    type="number"
                    id="digits-label"
                    onChange={handleChange}
                    placeholder={member}
                    autoFocus
                />
                <span className="error" aria-live="polite">{validationMsg[errorToken]}</span>
            </Form>
        </GenericDialog>
    );
};

DeleteMemberDialog.propTypes = {
    member: PropTypes.string.isRequired,
    randomNumber: PropTypes.number.isRequired,
    onCloseDialog: PropTypes.func.isRequired,
    onDeleteMember: PropTypes.func.isRequired
};

export default DeleteMemberDialog;

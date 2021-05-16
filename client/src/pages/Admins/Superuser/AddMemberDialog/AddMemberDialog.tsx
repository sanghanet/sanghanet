import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';

import './AddMemberDialog.scss';
import { emailValidationRule, nameValidationRule, validationError } from '../../../../components/ValidationRule';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface AddMemberDialogProps {
    onCloseDialog: React.MouseEventHandler<HTMLButtonElement>;
    onAddMember: (emailAddress: string, label: string) => void;
}

const AddMemberDialog: React.FC<AddMemberDialogProps> = ({ onCloseDialog, onAddMember }) => {
    const [emailInputValue, setEmailInputValue] = useState('');
    const [labelInputValue, setLabelInputValue] = useState('');
    const [emailInvalid, setEmailInvalid] = useState(true);
    const [labelInvalid, setLabelInvalid] = useState(true);
    const [labelErrorToken, setLabelErrorToken] = useState('');
    const [emailErrorToken, setEmailErrorToken] = useState('');

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        console.log(event);
        setEmailInputValue(event.target.value);
        setEmailErrorToken(validationError(event.target));
        setEmailInvalid(!!validationError(event.target));
    };

    const handleLabelChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setLabelInputValue(event.target.value);
        setLabelErrorToken(validationError(event.target));
        setLabelInvalid(!!validationError(event.target));
    };

    const addMember = (): void => {
        if (!(emailInvalid && labelInvalid)) {
            onAddMember(`${emailInputValue}@gmail.com`, labelInputValue);
        }
    };

    const handleAddMember: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        addMember();
        event && event.preventDefault();
    };

    const handleEnter: React.KeyboardEventHandler = (event) => {
        if (event.key === 'Enter') {
            addMember();
            event && event.preventDefault();
        }
    };

    const {
        modalButtons: { CANCEL, ADD },
        superuserAddMember: { POPUPADDMEMBER, POPUPNAME, POPUPEMAIL },
        validationMsg
    } = useContext(UIcontext).dictionary;

    return (
        <GenericDialog
            title={POPUPADDMEMBER}
            reject={CANCEL}
            accept={ADD}
            acceptDisabled={emailInvalid || labelInvalid}
            handleClose={onCloseDialog}
            handleAccept={handleAddMember}
        >
            <Form autoComplete="off" className="add-member-dialog">
                <Form.Label htmlFor="label-input">{POPUPNAME}<span>*</span></Form.Label>
                <Form.Control
                    className={labelErrorToken.length ? 'label-input invalid' : 'label-input'}
                    type="text"
                    value={labelInputValue}
                    id="label-input"
                    onChange={handleLabelChange}
                    onKeyPress={handleEnter}
                    autoFocus
                    {...nameValidationRule}
                />
                <span className="error" aria-live="polite">{validationMsg[labelErrorToken]}</span>
                <Form.Label htmlFor="email-input">{POPUPEMAIL}<span>*</span></Form.Label>
                <InputGroup>
                    <Form.Control
                        className={emailErrorToken.length ? 'email-input invalid' : 'email-input'}
                        type="text"
                        value={emailInputValue}
                        id="email-input"
                        onChange={handleEmailChange}
                        onKeyPress={handleEnter}
                        {...emailValidationRule}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>@gmail.com</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <span className="error" aria-live="polite">{validationMsg[emailErrorToken]}</span>
            </Form>
        </GenericDialog>
    );
};

AddMemberDialog.propTypes = {
    onCloseDialog: PropTypes.func.isRequired,
    onAddMember: PropTypes.func.isRequired
};

export default AddMemberDialog;

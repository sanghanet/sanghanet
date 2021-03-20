import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';

import './AddMemberDialog.scss';
import { emailValidationRule, nameValidationRule, validationError } from '../../../../components/ValidationRule';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const AddMemberDialog = ({ closeDialog, addMember }) => {

    const [emailInputValue, setEmailInputValue] = useState('');
    const [labelInputValue, setLabelInputValue] = useState('');
    const [emailInvalid, setEmailInvalid] = useState(true);
    const [labelInvalid, setLabelInvalid] = useState(true);
    const [labelErrorToken, setLabelErrorToken] = useState('');
    const [emailErrorToken, setEmailErrorToken] = useState('');

    const handleEmailChange = (event) => {
        setEmailInputValue(event.target.value);
        setEmailErrorToken(validationError(event.target));
        setEmailInvalid(!!validationError(event.target));
    }

    const handleLabelChange = (event) => {
        setLabelInputValue(event.target.value);
        setLabelErrorToken(validationError(event.target));
        setLabelInvalid(!!validationError(event.target));
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter' && !(labelInvalid || emailInvalid)) {
            handleAddMember();
        }
    }

    const handleAddMember = (event) => {
        if (!(emailInvalid && labelInvalid)) {
            addMember(`${emailInputValue}@gmail.com`, labelInputValue);
        }
        event && event.preventDefault();
    }

    const {
        modalButtons: { CANCEL, ADD },
        superuserAddMember: { POPUPADDMEMBER, POPUPNAME, POPUPEMAIL },
        validationMsg
    } = useContext(UIcontext).dictionary;

    return (
        <GenericDialog
            title = {POPUPADDMEMBER}
            reject = {CANCEL}
            accept = {ADD}
            acceptDisabled = {emailInvalid || labelInvalid}
            handleClose = {closeDialog}
            handleAccept = {handleAddMember}
        >
            <Form onSubmit={handleAddMember} autoComplete='off' className="add-member-dialog">
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
                >
                </Form.Control>
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
                    >
                    </Form.Control>
                    <InputGroup.Append>
                        <InputGroup.Text>@gmail.com</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <span className="error" aria-live="polite">{validationMsg[emailErrorToken]}</span>
            </Form>
        </GenericDialog>
    );
}

AddMemberDialog.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    addMember: PropTypes.func.isRequired
};

export default AddMemberDialog;

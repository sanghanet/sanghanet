import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';
import { validationError, descriptionValidationRule, positiveIntegerRule } from '../../../../components/ValidationRule';
import Form from 'react-bootstrap/Form';

import './AddPaymentDialog.scss';

function AddPaymentDialog (props) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [errorTokenDescription, setErrorTokenDescription] = useState('');
    const [errorTokenAmount, setErrorTokenAmount] = useState('');
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [amountValid, setAmountValid] = useState(false);

    const { closeDialog, addPayment, pocketName } = props;
    const { validationMsg } = useContext(UIcontext).dictionary;

    const handleDescriptionChange = (event) => {
        const input = event.target;
        setDescription(input.value);
        const validationResult = validationError(input);
        setErrorTokenDescription(validationResult);
        setDescriptionValid(validationResult === '');
    };

    const handlePaymentChange = (event) => {
        const input = event.target;
        setAmount(input.value);
        const validationResult = validationError(input);
        setErrorTokenAmount(validationResult);
        setAmountValid(validationResult === '');
    };

    const handleSubmit = (event) => {
        addPayment(description, parseInt(amount));
        event.preventDefault();
    };

    return (
        <GenericDialog
            title = 'Add payment'
            reject = 'Cancel'
            accept = 'Add'
            acceptDisabled = {!(descriptionValid && amountValid)}
            handleClose = {closeDialog}
            handleAccept = {handleSubmit}
        >

            <Form onSubmit={handleSubmit} autoComplete='off' className="add-payment-dialog">
                <p className='payment-label payment-name'>Name: ???</p>
                <p className='payment-label payment-pocket'>Pocket: {pocketName}</p>
                <Form.Label htmlFor="add-description-label" className="payment-label">Description</Form.Label>
                <Form.Control
                    id="add-description-label"
                    value={description}
                    onChange={handleDescriptionChange}
                    {...descriptionValidationRule}
                    autoFocus
                ></Form.Control>
                <span className="error" aria-live="polite">{validationMsg[errorTokenDescription]}</span><br></br>
                <Form.Label htmlFor="add-payment-label" className="payment-label">Amount</Form.Label>
                <Form.Control
                    id="add-payment-label"
                    value={amount}
                    onChange={handlePaymentChange}
                    {...positiveIntegerRule}
                ></Form.Control>
                <span className="error" aria-live="polite">{validationMsg[errorTokenAmount]}</span>
            </Form>
        </GenericDialog>
    );
}

AddPaymentDialog.propTypes = {
    addPayment: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    pocketName: PropTypes.string.isRequired
};

export default AddPaymentDialog;

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';
import { validationError, descriptionValidationRule, positiveIntegerRule } from '../../../../components/ValidationRule';
import Form from 'react-bootstrap/Form';

import './AddTransactionDialog.scss';

function AddTransactionDialog (props) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [errorTokenDescription, setErrorTokenDescription] = useState('');
    const [errorTokenAmount, setErrorTokenAmount] = useState('');
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [amountValid, setAmountValid] = useState(false);
    // const [dueDate, setDueDate] = useState(Date.now());

    const { transactionType, closeDialog, addPayment, pocketName, selectedUserEmail, selectedUserName } = props;
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
        addPayment(description, parseInt(amount), pocketName, transactionType);
        event.preventDefault();
    };

    return (
        <GenericDialog
            title = {`Add ${transactionType}`}
            reject = 'Cancel'
            accept = 'Add'
            acceptDisabled = {!(descriptionValid && amountValid)}
            handleClose = {closeDialog}
            handleAccept = {handleSubmit}
        >

            <Form onSubmit={handleSubmit} autoComplete='off' className="add-payment-dialog">
                <p className='payment-label payment-name'>Name: {selectedUserName}</p>
                <p className='payment-label payment-name'>Email: {selectedUserEmail}</p>
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

                {/* TODO: Date picker here! */}
                { transactionType === 'debt' &&
                    <span className="error" aria-live="polite">TODO: Date picker here!</span>
                    // <>
                    //     <Form.Label htmlFor="add-dueDate-label" className="payment-label">Due</Form.Label>
                    //     <Form.Control
                    //         id="add-dueDate-label"
                    //         value={amount}
                    //         onChange={handlePaymentChange}
                    //         {...positiveIntegerRule}
                    //     ></Form.Control>
                    // </>
                }

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

AddTransactionDialog.propTypes = {
    transactionType: PropTypes.string.isRequired,
    addPayment: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    pocketName: PropTypes.string.isRequired,
    selectedUserName: PropTypes.string.isRequired,
    selectedUserEmail: PropTypes.string.isRequired
};

export default AddTransactionDialog;

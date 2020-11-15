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
    const [dueDate, setDueDate] = useState('');
    const [errorTokenDescription, setErrorTokenDescription] = useState('');
    const [errorTokenAmount, setErrorTokenAmount] = useState('');
    const [errorTokenDate, setErrorTokenDate] = useState('');
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [amountValid, setAmountValid] = useState(false);
    const [dueDateValid, setDueDateValid] = useState(false);

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
    const handleDateChange = (event) => {
        const input = event.target;
        setDueDate(input.value);
        const yearMonthDayString = new Date(Date.now()).toISOString().slice(0, 10);
        const validationResult = new Date(input.value) < new Date(yearMonthDayString) ? 'WRONGDATE' : '';
        setErrorTokenDate(validationResult);
        setDueDateValid(validationResult === '');
    };
    const handleSubmit = (event) => {
        addPayment(
            description,
            parseInt(amount),
            pocketName,
            transactionType,
            transactionType === 'payment' ? null : dueDate
        );
        event.preventDefault();
    };

    return (
        <GenericDialog
            title = {`Add ${transactionType}`}
            reject = 'Cancel'
            accept = 'Add'
            acceptDisabled = {!(descriptionValid && amountValid && (transactionType === 'payment' || dueDateValid))}
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
                <span className="error" aria-live="polite">{validationMsg[errorTokenDescription]}</span>

                { transactionType === 'debt' &&
                    <>
                        <Form.Label htmlFor="add-dueDate-label" className="payment-label">Due from</Form.Label>
                        <Form.Control
                            type="date"
                            className="date-picker"
                            onKeyDown={(e) => e.preventDefault()}
                            id="add-dueDate-label"
                            value={dueDate}
                            onChange={handleDateChange}
                        ></Form.Control>
                        <span className="error" aria-live="polite">{validationMsg[errorTokenDate]}</span>
                    </>
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

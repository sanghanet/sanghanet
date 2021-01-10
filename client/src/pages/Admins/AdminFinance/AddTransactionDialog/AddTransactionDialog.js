import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDateInput from '../../../../components/Form/CustomDateInput/CustomDateInput';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';
import { validationError, descriptionValidationRule, positiveIntegerRule } from '../../../../components/ValidationRule';
import Form from 'react-bootstrap/Form';

import './AddTransactionDialog.scss';

function AddTransactionDialog (props) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState(Date.now());
    const [errorTokenDescription, setErrorTokenDescription] = useState('');
    const [errorTokenAmount, setErrorTokenAmount] = useState('');
    const [errorTokenDate, setErrorTokenDate] = useState('');
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [amountValid, setAmountValid] = useState(false);
    const [dueDateValid, setDueDateValid] = useState(false);

    const { transactionType, closeDialog, addPayment, pocketName, selectedUserEmail, selectedUserName } = props;

    const {
        validationMsg,
        generalTermsDictionary: { NAME, EMAIL },
        financePockets,
        transactionTable: { DESCRIPTION, AMOUNT, DUEDATE },
        addTransactionDialog: { BEFORETYPE, AFTERTYPE, DATESELECTORINFO },
        modalButtons: { CANCEL, ADD },
        transactionTypes
    } = useContext(UIcontext).dictionary;

    const transactionTypeToDisplay = transactionTypes?.[transactionType ? transactionType.toUpperCase() : null];

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
    const handleDateChange = (date) => {
        setDueDate(date);
        const yearMonthDayString = new Date(Date.now()).toISOString().slice(0, 10);
        const validationResult = date < new Date(yearMonthDayString) ? 'WRONGDATE' : '';
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

    const translatedPocketName = financePockets[pocketName.toUpperCase()];

    return (
        <GenericDialog
            title = {`${BEFORETYPE}${transactionTypeToDisplay}${AFTERTYPE}`}
            reject = { CANCEL }
            accept = { ADD }
            acceptDisabled = {!(descriptionValid && amountValid && (transactionType === 'payment' || dueDateValid))}
            handleClose = {closeDialog}
            handleAccept = {handleSubmit}
        >

            <Form onSubmit={handleSubmit} autoComplete='off' className="add-payment-dialog">
                <p className='payment-label payment-name'>{ NAME }: {selectedUserName}</p>
                <p className='payment-label payment-name'>{ EMAIL }: {selectedUserEmail}</p>
                <p className='payment-label payment-pocket'>{ financePockets.POCKET }: {translatedPocketName}</p>

                <Form.Label htmlFor="add-description-label" className="payment-label">{ DESCRIPTION }</Form.Label>
                <Form.Control
                    id="add-description-label"
                    value={description}
                    onChange={handleDescriptionChange}
                    {...descriptionValidationRule}
                    autoFocus
                ></Form.Control>
                <span className="error" aria-live="polite">{validationMsg[errorTokenDescription]}</span>

                <Form.Label htmlFor="add-payment-label" className="payment-label">{ AMOUNT }</Form.Label>
                <Form.Control
                    id="add-payment-label"
                    value={amount}
                    onChange={handlePaymentChange}
                    {...positiveIntegerRule}
                ></Form.Control>
                <span className="error" aria-live="polite">{validationMsg[errorTokenAmount]}</span>

                { transactionType === 'debt' &&
                    <div>
                        <Form.Label className="payment-label">{ DUEDATE } ({ DATESELECTORINFO })</Form.Label>
                        <div className='date-picker-finance'>
                            <DatePicker
                                id="add-dueDate-label"
                                selected={dueDate}
                                onChange={handleDateChange}
                                customInput={<CustomDateInput />}

                                onMonthChange={handleDateChange}
                                onYearChange={handleDateChange}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                inline
                            />
                        </div>
                        <span className="error" aria-live="polite">{validationMsg[errorTokenDate]}</span>
                    </div>
                }
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

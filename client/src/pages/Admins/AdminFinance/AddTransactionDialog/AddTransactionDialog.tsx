import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDateInput from '../../../../components/Form/CustomDateInput/CustomDateInput';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';
import {
    validationError,
    descriptionValidationRule,
    positiveIntegerRule
} from '../../../../components/ValidationRule';
import Form from 'react-bootstrap/Form';

import './AddTransactionDialog.scss';

interface AddTransactionDialogProps {
    transactionType: TRANSACTION;
    closeDialog: () => void;
    addPayment: HandleTransaction;
    pocketName: string;
    selectedUserEmail: string;
    selectedUserName: string;
};

const AddTransactionDialog: React.FC<AddTransactionDialogProps> = (props) => {
    const {
        transactionType,
        closeDialog,
        addPayment,
        pocketName,
        selectedUserEmail,
        selectedUserName
    } = props;

    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date>(new Date(Date.now()));
    const [errorTokenDescription, setErrorTokenDescription] = useState<string>('');
    const [errorTokenAmount, setErrorTokenAmount] = useState<string>('');
    const [errorTokenDate, setErrorTokenDate] = useState('');
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [amountValid, setAmountValid] = useState(false);
    const [dueDateValid, setDueDateValid] = useState(false);

    const {
        validationMsg,
        generalTermsDictionary: { NAME, EMAIL },
        financePockets,
        transactionTable: { DESCRIPTION, AMOUNT, DUEDATE },
        addTransactionDialog: { BEFORETYPE, AFTERTYPE, DATESELECTORINFO },
        modalButtons: { CANCEL, ADD },
        transactionTypes
    } = useContext(UIcontext).dictionary;

    const transactionTypeToDisplay =
        transactionTypes?.[transactionType ? transactionType.toUpperCase() : ''];

    const handleDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const input = event.target;
        setDescription(input.value);
        const validationResult = validationError(input);
        setErrorTokenDescription(validationResult);
        setDescriptionValid(validationResult === '');
    };

    const handlePaymentChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const input = event.target;
        setAmount(input.value);
        const validationResult = validationError(input);
        setErrorTokenAmount(validationResult);
        setAmountValid(validationResult === '');
    };

    const handleDateChange = (date: Date): void => {
        setDueDate(date);
        const yearMonthDayString = new Date(Date.now()).toISOString().slice(0, 10);
        const validationResult = date < new Date(yearMonthDayString) ? 'WRONGDATE' : '';
        setErrorTokenDate(validationResult);
        setDueDateValid(validationResult === '');
    };

    const handleSubmit: React.FormEventHandler = (event) => {
        addPayment(
            description,
            amount,
            pocketName,
            transactionType,
            transactionType === 'payment' ? null : dueDate
        );
        event.preventDefault();
    };

    const translatedPocketName = financePockets[pocketName.toUpperCase()];

    return (
        <GenericDialog
            title={`${BEFORETYPE}${transactionTypeToDisplay}${AFTERTYPE}`}
            reject={CANCEL}
            accept={ADD}
            acceptDisabled={!(
                descriptionValid &&
                amountValid &&
                (transactionType === 'payment' || dueDateValid)
            )}
            handleClose={closeDialog}
            handleAccept={handleSubmit}
        >
            <Form onSubmit={handleSubmit} autoComplete="off" className="add-payment-dialog">
                <p className="payment-label payment-name">
                    {NAME}: {selectedUserName}
                </p>
                <p className="payment-label payment-name">
                    {EMAIL}: {selectedUserEmail}
                </p>
                <p className="payment-label payment-pocket">
                    {financePockets.POCKET}: {translatedPocketName}
                </p>

                <Form.Label htmlFor="add-description-label" className="payment-label">
                    {DESCRIPTION}
                </Form.Label>
                <Form.Control
                    id="add-description-label"
                    value={description}
                    onChange={handleDescriptionChange}
                    {...descriptionValidationRule}
                    autoFocus
                />
                <span className="error" aria-live="polite">
                    {validationMsg[errorTokenDescription]}
                </span>

                <Form.Label htmlFor="add-payment-label" className="payment-label">
                    {AMOUNT}
                </Form.Label>
                <Form.Control
                    id="add-payment-label"
                    value={amount}
                    onChange={handlePaymentChange}
                    {...positiveIntegerRule}
                />
                <span className="error" aria-live="polite">
                    {validationMsg[errorTokenAmount]}
                </span>

                {transactionType === 'debt' && (
                    <div>
                        <Form.Label className="payment-label">
                            {DUEDATE} ({DATESELECTORINFO})
                        </Form.Label>
                        <div className="date-picker-finance">
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
                        <span className="error" aria-live="polite">
                            {validationMsg[errorTokenDate]}
                        </span>
                    </div>
                )}
            </Form>
        </GenericDialog>
    );
};

AddTransactionDialog.propTypes = {
    transactionType: PropTypes.oneOf<TRANSACTION>(['payment', 'debt', '']).isRequired,
    addPayment: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    pocketName: PropTypes.string.isRequired,
    selectedUserName: PropTypes.string.isRequired,
    selectedUserEmail: PropTypes.string.isRequired
};

export default AddTransactionDialog;

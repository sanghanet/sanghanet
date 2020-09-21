import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';
import { validationError, positiveIntegerRule } from '../../../../components/ValidationRule';
import Form from 'react-bootstrap/Form';

import './AddPaymentDialog.scss';

function AddPaymentDialog (props) {
    const [amount, setAmount] = useState('');
    const [errorToken, setErrorToken] = useState('');
    const [isDisabled, setDisabled] = useState(true);

    const { closeDialog, addPayment, pocketName } = props;
    const { validationMsg } = useContext(UIcontext).dictionary;

    const handlePaymentChange = (event) => {
        const input = event.target;
        const validationResult = validationError(input);
        setDisabled(validationResult !== '');
        setAmount(input.value);
        setErrorToken(validationResult);
    };

    const handleSubmit = (event) => {
        addPayment(parseInt(amount));
        event.preventDefault();
    };

    return (
        <GenericDialog
            title = 'Add payment'
            reject = 'Cancel'
            accept = 'Add'
            acceptDisabled = {isDisabled}
            handleClose = {closeDialog}
            handleAccept = {handleSubmit}
        >

            <Form onSubmit={handleSubmit} autoComplete='off' className="add-payment-dialog">
                <Form.Label htmlFor="add-payment-label">
                    <p className='payment-label payment-name'>Name: ???</p>
                    <p className='payment-label payment-pocket'>Pocket: {pocketName}</p>
                </Form.Label>
                <Form.Control
                    id="add-payment-label"
                    value={amount}
                    onChange={handlePaymentChange}
                    autoFocus
                    {...positiveIntegerRule}
                ></Form.Control>
                <span className="error" aria-live="polite">{validationMsg[errorToken]}</span>
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

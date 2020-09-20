import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
// import { validationError } from '../../../../components/ValidationRule';
import Form from 'react-bootstrap/Form';

import './AddPaymentDialog.scss';

function AddPaymentDialog (props) {
    // const [count, setCount] = useState(0);

    const { closeDialog, addPayment, pocketName } = props;
    return (
        <GenericDialog
            title = 'Add payment'
            reject = 'Cancel'
            accept = 'Add'
            // acceptDisabled = {emailInvalid || labelInvalid}
            handleClose = {closeDialog}
            handleAccept = {addPayment}
        >
            <h3 className='payment-h3 payment-name'>Name: ???</h3>
            <h3 className='payment-h3 payment-pocket'>Pocket: {pocketName}</h3>
            {/* <Form onSubmit={this.handleDelete} autoComplete='off' className="delete-dialog">
                <Form.Label htmlFor="digits-label">
                    <span className="msg">{MSGDELETE}&nbsp;</span>
                    <span className="email">{member}</span>
                    <span className="msg">? <br></br>{CONFIRMDELETE}&nbsp;</span>
                    <span className="random-no">{randomNumber}</span>
                </Form.Label>
                <Form.Control
                    type="number"
                    id="digits-label"
                    onChange={this.handleChange}
                    min="1000"
                    max="9999"
                    placeholder={member}
                    autoFocus
                ></Form.Control>
                <span className="error" aria-live="polite">{validationMsg[errorToken]}</span>
            </Form> */}
        </GenericDialog>
    );
}

AddPaymentDialog.propTypes = {
    addPayment: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    pocketName: PropTypes.string.isRequired
};

export default AddPaymentDialog;

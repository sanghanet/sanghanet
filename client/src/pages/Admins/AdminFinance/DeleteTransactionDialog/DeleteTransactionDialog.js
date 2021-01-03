import React from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';

import './DeleteTransactionDialog.scss';

function DeleteTransactionDialog (props) {
    const { deleteTransaction, closeDialog, selectedUserEmail, selectedUserName, transaction } = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        deleteTransaction(transaction.id, transaction.pocket);
    };

    return (
        <GenericDialog
            title = 'Delete Transaction'
            reject = 'Cancel'
            accept = 'Delete'
            handleClose = {closeDialog}
            handleAccept = {handleSubmit}
        >
            <div className='delete-container'>
                <p>User: {selectedUserName}</p>
                <p>Email: {selectedUserEmail}</p>
                <p>Pocket: {transaction.pocket}</p>
                <h4>Transaction details:</h4>
                <p>Description: {transaction.description}</p>
                <p>Amount: {`${transaction.amount} ${transaction.currency}`}</p>
                <p>Due date: {transaction.duedate}</p>
            </div>
        </GenericDialog>
    );
}

DeleteTransactionDialog.propTypes = {
    deleteTransaction: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    selectedUserName: PropTypes.string.isRequired,
    selectedUserEmail: PropTypes.string.isRequired,
    transaction: PropTypes.object.isRequired
};

export default DeleteTransactionDialog;

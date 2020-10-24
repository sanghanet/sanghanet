import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';

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
            <>
                <h5>User  : {selectedUserName}</h5>
                <h5>Email : {selectedUserEmail}</h5>
                <h5>Pocket: {transaction.pocket}</h5>
                <h5>--- Transaction --- </h5>
                <h6>{transaction.description}</h6>
                <h6>{`${transaction.amount} ${transaction.currency}`}</h6>
                <h6>{transaction.duedate}</h6>
            </>
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

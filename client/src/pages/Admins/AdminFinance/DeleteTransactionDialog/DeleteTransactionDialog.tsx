import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';

import './DeleteTransactionDialog.scss';

interface DeleteTransactionDialogProps {
    deleteTransaction: (transactionId: string, pocket: string) => void;
    closeDialog: () => void;
    selectedUserEmail: string;
    selectedUserName: string;
    transaction: TransactionToDelete;
}

const DeleteTransactionDialog: React.FC<DeleteTransactionDialogProps> = (props) => {
    const {
        deleteTransaction,
        closeDialog,
        selectedUserEmail,
        selectedUserName,
        transaction,
    } = props;

    const {
        generalTermsDictionary: { NAME, EMAIL },
        transactionTable: { DELETETRANSACTION, TRANSACTIONDETAILS, DESCRIPTION, AMOUNT, DUEDATE },
        financePockets,
        modalButtons: { CANCEL, DELETE },
    } = useContext(UIcontext).dictionary;

    const handleSubmit = (event: React.MouseEvent): void => {
        event.preventDefault();
        deleteTransaction(transaction.id, transaction.pocket);
    };

    const translatedPocketName = financePockets[transaction.pocket.toUpperCase()];

    return (
        <GenericDialog
            title={DELETETRANSACTION}
            reject={CANCEL}
            accept={DELETE}
            handleClose={closeDialog}
            handleAccept={handleSubmit}
        >
            <div className="delete-container">
                <p>
                    {NAME}: {selectedUserName}
                </p>
                <p>
                    {EMAIL}: {selectedUserEmail}
                </p>
                <p>
                    {financePockets.POCKET}: {translatedPocketName}
                </p>
                <h4>{TRANSACTIONDETAILS}</h4>
                <p>
                    {DESCRIPTION}: {transaction.description}
                </p>
                <p>
                    {AMOUNT}: {`${transaction.amount} ${transaction.currency}`}
                </p>
                <p>
                    {DUEDATE}: {transaction.dueDate}
                </p>
            </div>
        </GenericDialog>
    );
};

DeleteTransactionDialog.propTypes = {
    deleteTransaction: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    selectedUserName: PropTypes.string.isRequired,
    selectedUserEmail: PropTypes.string.isRequired,
    transaction: PropTypes.exact({
        id: PropTypes.string.isRequired,
        pocket: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
    }).isRequired,
};

export default DeleteTransactionDialog;

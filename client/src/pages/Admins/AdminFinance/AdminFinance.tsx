import React, { useState } from 'react';
import FileSaver from 'file-saver';
import Client from '../../../components/Client';

import FinanceContainer from '../../Finances/FinanceContainer/FinanceContainer';
import UserSelector from './UserSelector/UserSelector';
import AddTransactionDialog from './AddTransactionDialog/AddTransactionDialog';
import DeleteTransactionDialog from './DeleteTransactionDialog/DeleteTransactionDialog';
import TransactionExport from '../../../components/TransactionExport/TransactionExport';
import Alert from '../../../components/Alert/Alert';

const AdminFinance: React.FC<Record<string, unknown>> = (props) => {
    const [selectedUserEmail, setSelectedUserEmail] = useState('');
    const [selectedUserName, setSelectedUserName] = useState('');
    const [showAddTransaction, setShowAddTransaction] = useState(false);
    const [paymentDialogPocketName, setPaymentDialogPocketName] = useState('');
    const [transactionType, setTransactionType] = useState<TRANSACTION>('');
    const [showDeleteTransaction, setShowDeleteTransaction] = useState(false);
    const [transaction, setTransaction] = useState<TransactionToDelete | null>(null);
    const [refreshFinanceData, setRefreshFinanceData] = useState(0);
    const [activeTabFromAdmin, setActiveTabFromAdmin] = useState('membership');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<ALERT>('NOALERT');

    const onSelection = (email: string, userName: string): void => {
        setSelectedUserEmail(email);
        setSelectedUserName(userName);
    };

    const openAddPayment = (pocket: string): void => {
        setShowAddTransaction(true);
        setPaymentDialogPocketName(pocket);
        setTransactionType('payment');
    };

    const openAddDebt = (pocket: string): void => {
        setShowAddTransaction(true);
        setPaymentDialogPocketName(pocket);
        setTransactionType('debt');
    };

    const closeTransactionDialog = (): void => {
        setShowAddTransaction(false);
        setPaymentDialogPocketName('');
        setTransactionType('');
    };

    const closeAlert = (): void => {
        setShowAlert(false);
        setAlertMessage('');
        setAlertType('NOALERT');
    };

    const handleTransaction: HandleTransaction = (
        description,
        amount,
        pocketName,
        transactionType,
        dueDate
    ) => {
        // TODO:to avoid confusion in case of duplicate name - name search should display name with emails as a result (Kis Pista kis.p1@gmail.com)
        // TODO:DB: why pocket field is present in every transaction

        Client.fetch('/finance/addtransaction/', {
            method: 'POST',
            body: `{
                "email": "${selectedUserEmail}",
                "description": "${description}",
                "amount": "${amount}",
                "transactionType": "${transactionType}",
                "pocket": "${pocketName}",
                "dueDate": "${dueDate}"
            }`
        })
            .then((data) => {
                setActiveTabFromAdmin(pocketName);
                setRefreshFinanceData(Date.now());
            })
            .catch((err) => {
                setShowAlert(true);
                setAlertMessage(err.message);
                setAlertType('ERROR');
            });
        closeTransactionDialog();
    };

    const openDeleteTransaction = (transaction: TransactionToDelete): void => {
        setShowDeleteTransaction(true);
        setTransaction(transaction);
    };

    const closeDeleteTransaction = (): void => {
        setShowDeleteTransaction(false);
        setTransaction(null);
    };

    const handleDeleteTransaction = (transactionID: string, pocket: string): void => {
        Client.fetch('/finance/deletetransaction/', {
            method: 'POST',
            body: `{
                "email": "${selectedUserEmail}",
                "pocket": "${pocket}",
                "transactionID": "${transactionID}"
            }`
        })
            .then((data) => {
                setActiveTabFromAdmin(pocket);
                setRefreshFinanceData(Date.now());
            })
            .catch((err) => {
                setShowAlert(true);
                setAlertMessage(err.message);
                setAlertType('ERROR');
            });
        closeDeleteTransaction();
    };

    const handleTransactionExport = (): void => {
        let fileName = 'allFinanceData.csv';
        Client.fetch('/finance/exportdata/', {
            method: 'POST',
            body: `{
                "select": "all"
            }`
        })
            .then((data) => {
                const contentDisposition: string = data.headers.get('content-disposition');
                fileName = contentDisposition.slice(22, contentDisposition.length - 1);
                return data.blob();
            })
            .then((blob) => FileSaver.saveAs(blob, fileName))
            .catch((err) => {
                setShowAlert(true);
                setAlertMessage(err.message);
                setAlertType('ERROR');
            });
    };

    return (
        <>
            <UserSelector handleSubmit={onSelection} />
            <FinanceContainer
                key={refreshFinanceData}
                selectedUser={selectedUserEmail}
                openAddPayment={openAddPayment}
                openAddDebt={openAddDebt}
                openDeleteTransaction={openDeleteTransaction}
                isFinAdmin
                activeTabFromAdmin={activeTabFromAdmin}
            />
            {!selectedUserEmail && (<TransactionExport handleTransactionExport={handleTransactionExport} />)}
            {showAddTransaction && transactionType && (
                <AddTransactionDialog
                    transactionType={transactionType}
                    addPayment={handleTransaction}
                    closeDialog={closeTransactionDialog}
                    selectedUserEmail={selectedUserEmail}
                    selectedUserName={selectedUserName}
                    pocketName={paymentDialogPocketName}
                />
            )}
            {showDeleteTransaction && transaction && (
                <DeleteTransactionDialog
                    deleteTransaction={handleDeleteTransaction}
                    closeDialog={closeDeleteTransaction}
                    selectedUserEmail={selectedUserEmail}
                    selectedUserName={selectedUserName}
                    transaction={transaction}
                />)}
            {showAlert &&
                <Alert
                    alertMsg={alertMessage}
                    alertType={alertType}
                    alertClose={closeAlert}
                />}
        </>
    );
};

export default AdminFinance;

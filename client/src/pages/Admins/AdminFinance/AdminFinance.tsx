import React, { useState } from 'react';
import Client from '../../../components/Client';

import FinanceContainer from '../../Finances/FinanceContainer/FinanceContainer';
import UserSelector from './UserSelector/UserSelector';
import AddTransactionDialog from './AddTransactionDialog/AddTransactionDialog';
import DeleteTransactionDialog from './DeleteTransactionDialog/DeleteTransactionDialog';
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
    const [activeTab, setActiveTab] = useState('membership');
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

    const changeActiveTab = (pocket: string): void => {
        setActiveTab(pocket);
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
                setRefreshFinanceData(Date.now());
                setActiveTab(pocketName);
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
                setRefreshFinanceData(Date.now());
                setActiveTab(pocket);
            })
            .catch((err) => {
                setShowAlert(true);
                setAlertMessage(err.message);
                setAlertType('ERROR');
            });
        closeDeleteTransaction();
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
                activeTab={activeTab}
                changeActiveTab={changeActiveTab}
            />
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

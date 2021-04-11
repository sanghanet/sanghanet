import React, { useState } from 'react';
import Client from '../../../components/Client';

import FinanceContainer from '../../Finances/FinanceContainer/FinanceContainer';
import UserSelector from './UserSelector/UserSelector';
import AddTransactionDialog from './AddTransactionDialog/AddTransactionDialog';
import DeleteTransactionDialog from './DeleteTransactionDialog/DeleteTransactionDialog';
import Alert from '../../../components/Alert/Alert';

const AdminFinance = (props) => {
    const [selectedUserEmail, setSelectedUserEmail] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(null);
    const [showAddTransaction, setShowAddTransaction] = useState(false);
    const [paymentDialogPocketName, setPaymentDialogPocketName] = useState('');
    const [transactionType, setTransactionType] = useState(null);
    const [showDeleteTransaction, setShowDeleteTransaction] = useState(false);
    const [transaction, setTransaction] = useState(null);
    const [refreshFinanceData, setRefreshFinanceData] = useState(0);
    const [activeTab, setActiveTab] = useState('membership');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const onSelection = (email, userName) => {
        setSelectedUserEmail(email);
        setSelectedUserName(userName);
    }

    const openAddPayment = (pocket) => {
        setShowAddTransaction(true);
        setPaymentDialogPocketName(pocket);
        setTransactionType('payment');
    }

    const openAddDebt = (pocket) => {
        setShowAddTransaction(true);
        setPaymentDialogPocketName(pocket);
        setTransactionType('debt');
    }

    const closeTransactionDialog = () => {
        setShowAddTransaction(false);
        setPaymentDialogPocketName('');
        setTransactionType(null);
    }

    const closeAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
        setAlertType('');
    }

    const handleTransaction = (description, amount, pocketName, transactionType, dueDate) => {
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
            }).catch((err) => {
                console.log(err);
                setShowAlert(true);
                setAlertMessage(err.message);
                setAlertType('ERROR');
            });
        closeTransactionDialog();
    }

    const openDeleteTransaction = (transaction) => {
        setShowDeleteTransaction(true);
        setTransaction(transaction)
    }

    const closeDeleteTransaction = () => {
        setShowDeleteTransaction(false);
        setTransaction(null)
    }

    const handleDeleteTransaction = (transactionID, pocket) => {
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
            }).catch((err) => {
                console.log(err);
                setShowAlert(true);
                setAlertMessage(err.message);
                setAlertType('ERROR');
            });
        closeDeleteTransaction();
    }

    return (
        <React.Fragment>
            <UserSelector handleSubmit={onSelection} />
            <FinanceContainer key={refreshFinanceData}
                selectedUser={selectedUserEmail}
                openAddPayment={openAddPayment}
                openAddDebt={openAddDebt}
                openDeleteTransaction={openDeleteTransaction}
                isFinAdmin={true}
                activeTab={activeTab}
            />
            { showAddTransaction &&
                <AddTransactionDialog
                    transactionType={transactionType}
                    addPayment={handleTransaction}
                    closeDialog={closeTransactionDialog}
                    selectedUserEmail={selectedUserEmail}
                    selectedUserName={selectedUserName}
                    pocketName={paymentDialogPocketName}
                />
            }
            { showDeleteTransaction &&
                <DeleteTransactionDialog
                    deleteTransaction={handleDeleteTransaction}
                    closeDialog={closeDeleteTransaction}
                    selectedUserEmail={selectedUserEmail}
                    selectedUserName={selectedUserName}
                    transaction={transaction}
                />
            }
            { showAlert &&
                <Alert
                    alertMsg={alertMessage}
                    alertType={alertType}
                    alertClose={closeAlert}
                />
            }
        </React.Fragment>
    );

}

export default AdminFinance;

import React from 'react';
import Client from '../../../components/Client';

import FinanceContainer from '../../Finances/FinanceContainer/FinanceContainer';
import UserSelector from './UserSelector/UserSelector';
import AddTransactionDialog from './AddTransactionDialog/AddTransactionDialog';
import DeleteTransactionDialog from './DeleteTransactionDialog/DeleteTransactionDialog';
import Alert from '../../../components/Alert/Alert';

class AdminFinance extends React.Component {
    state = {
        selectedUserEmail: null,
        selectedUserName: null,
        showAddTransaction: false,
        paymentDialogPocketName: '',
        transactionType: null, // Payment or Debt

        showDeleteTransaction: false,
        transaction: null,

        refreshFinanceData: 0, // fine HACK to rerender Component when new data is available.
        activeTab: 'membership',

        showAlert: false,
        alertMessage: '',
        alertType: ''
    }

    onSelection = (email, userName) => {
        this.setState({ selectedUserEmail: email, selectedUserName: userName });
    }

    openAddPayment = (pocket) => {
        this.setState({ showAddTransaction: true, paymentDialogPocketName: pocket, transactionType: 'payment' });
    }

    openAddDebt = (pocket) => {
        this.setState({ showAddTransaction: true, paymentDialogPocketName: pocket, transactionType: 'debt' });
    }

    closeTransactionDialog = () => {
        this.setState({ showAddTransaction: false, paymentDialogPocketName: '', transactionType: null });
    }

    closeAlert = () => {
        this.setState({ showAlert: false, alertMessage: '', alertType: '' });
    }

    handleTransaction = (description, amount, pocketName, transactionType, dueDate) => {
        // TODO:to avoid confusion in case of duplicate name - name search should display name with emails as a result (Kis Pista kis.p1@gmail.com)
        // TODO:DB: why pocket field is present in every transaction

        Client.fetch('/finance/addtransaction/', {
            method: 'POST',
            body: `{
                "email": "${this.state.selectedUserEmail}",
                "description": "${description}",
                "amount": "${amount}",
                "transactionType": "${transactionType}",
                "pocket": "${pocketName}",
                "dueDate": "${dueDate}"
            }`
        })
            .then((data) => {
                this.setState({ refreshFinanceData: Date.now(), activeTab: pocketName });
            }).catch((err) => {
                console.log(err);
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
            });
        this.closeTransactionDialog();
    }

    openDeleteTransaction = (transaction) => {
        this.setState({ showDeleteTransaction: true, transaction: transaction });
    }

    closeDeleteTransaction = () => {
        this.setState({ showDeleteTransaction: false, transaction: null });
    }

    handleDeleteTransaction = (transactionID, pocket) => {
        Client.fetch('/finance/deletetransaction/', {
            method: 'POST',
            body: `{
                "email": "${this.state.selectedUserEmail}",
                "pocket": "${pocket}",
                "transactionID": "${transactionID}"
            }`
        })
            .then((data) => {
                this.setState({ refreshFinanceData: Date.now(), activeTab: pocket });
            }).catch((err) => {
                console.log(err);
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
            });
        this.setState({ showDeleteTransaction: false, transaction: null });
    }

    render () {
        const {
            showAddTransaction,
            showDeleteTransaction,
            transaction,
            showAlert,
            alertType,
            alertMessage,
            paymentDialogPocketName,
            selectedUserEmail,
            selectedUserName,
            transactionType,
            refreshFinanceData,
            activeTab
        } = this.state;

        return (
            <React.Fragment>
                <UserSelector handleSubmit={this.onSelection} />
                <FinanceContainer key = {refreshFinanceData}
                    selectedUser = {selectedUserEmail}
                    openAddPayment = {this.openAddPayment}
                    openAddDebt = {this.openAddDebt}
                    openDeleteTransaction = {this.openDeleteTransaction}
                    isFinAdmin = {true}
                    activeTab = {activeTab}
                />
                { showAddTransaction &&
                    <AddTransactionDialog
                        transactionType = {transactionType}
                        addPayment = {this.handleTransaction}
                        closeDialog = {this.closeTransactionDialog}
                        selectedUserEmail= {selectedUserEmail}
                        selectedUserName = {selectedUserName}
                        pocketName = {paymentDialogPocketName}
                    />
                }
                { showDeleteTransaction &&
                    <DeleteTransactionDialog
                        deleteTransaction = {this.handleDeleteTransaction}
                        closeDialog = {this.closeDeleteTransaction}
                        selectedUserEmail= {selectedUserEmail}
                        selectedUserName = {selectedUserName}
                        transaction = {transaction}
                    />
                }
                { showAlert &&
                    <Alert
                        alertMsg={alertMessage}
                        alertType={alertType}
                        alertClose={this.closeAlert}
                    />
                }
            </React.Fragment>
        );
    }
}

export default AdminFinance;

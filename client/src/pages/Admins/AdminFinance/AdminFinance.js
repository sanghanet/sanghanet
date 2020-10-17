import React from 'react';
import Client from '../../../components/Client';

import FinanceContainer from '../../Finances/FinanceContainer/FinanceContainer';
import UserSelector from './UserSelector/UserSelector';
import AddTransactionDialog from './AddTransactionDialog/AddTransactionDialog';
import Alert from '../../../components/Alert/Alert';

class AdminFinance extends React.Component {
    state = {
        selectedUserEmail: null,
        selectedUserName: null,
        showAddTransaction: false,
        paymentDialogPocketName: '',
        transactionType: null, // Payment or Debt

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

    handleTransaction = (description, amount, pocketName, transactionType) => {
        // TODO:to avoid confusion in case of duplicate name - name search should display name with emails as a result (Kis Pista kis.p1@gmail.com)
        // TODO:DB: why pocket field is present in every transaction

        Client.fetch('/finance/addtransaction/', {
            method: 'POST',
            body: `{
                "email": "${this.state.selectedUserEmail}",
                "description": "${description}",
                "amount": "${amount}",
                "transactionType": "${transactionType}",
                "pocket": "${pocketName}"
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

    render () {
        const {
            showAddTransaction,
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

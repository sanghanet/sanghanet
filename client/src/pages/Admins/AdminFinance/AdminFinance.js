import React from 'react';
import Client from '../../../components/Client';

import FinanceContainer from '../../Finances/FinanceContainer/FinanceContainer';
import UserSelector from './UserSelector/UserSelector';
import AddPaymentDialog from './AddPaymentDialog/AddPaymentDialog';
import Alert from '../../../components/Alert/Alert';

class AdminFinance extends React.Component {
    state = {
        selectedUserEmail: null,
        selectedUserName: null,
        showAddPaymentDialog: false,
        paymentDialogPocketName: '',

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
        this.setState({ showAddPaymentDialog: true, paymentDialogPocketName: pocket });
    }

    closeAddPayment = () => {
        this.setState({ showAddPaymentDialog: false, paymentDialogPocketName: '' });
    }

    closeAlert = () => {
        this.setState({ showAlert: false, alertMessage: '', alertType: '' });
    }

    handleAddPayment = (description, amount, pocketName) => {
        // TODO:to avoid confusion in case of duplicate name - name search should display name with emails as a result (Kis Pista kis.p1@gmail.com)
        // TODO:DB: why pocket field is present in every transaction

        Client.fetch('/finance/addtransaction/', {
            method: 'POST',
            body: `{
                "email": "${this.state.selectedUserEmail}",
                "description": "${description}",
                "amount": "${amount}",
                "pocket": "${pocketName}"
            }`
        })
            .then((data) => {
                this.setState({ refreshFinanceData: Date.now(), activeTab: pocketName });
            }).catch((err) => {
                console.log(err);
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
            });
        this.closeAddPayment();
    }

    render () {
        const {
            showAddPaymentDialog,
            showAlert,
            alertType,
            alertMessage,
            paymentDialogPocketName,
            selectedUserEmail,
            selectedUserName,
            refreshFinanceData,
            activeTab
        } = this.state;

        return (
            <React.Fragment>
                <UserSelector handleSubmit={this.onSelection} />
                <FinanceContainer key = {refreshFinanceData}
                    selectedUser = {selectedUserEmail}
                    openAddPayment= {this.openAddPayment}
                    isFinAdmin = {true}
                    activeTab = {activeTab}
                />
                { showAddPaymentDialog &&
                    <AddPaymentDialog
                        addPayment = {this.handleAddPayment}
                        closeDialog = {this.closeAddPayment}
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

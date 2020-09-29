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

        console.log(description, amount, pocketName, this.state.selectedUserEmail);
        console.log('FETCH: handleAddPayment');

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
                console.log(data);
            }).catch((err) => {
                console.log(err);
                // this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
            });
        this.closeAddPayment();
    }
    // handleAddPayment = (emailAddress, label) => {
    //     Client.fetch('/su/addmember', {
    //         method: 'POST',
    //         body: `{"email": "${emailAddress}", "label": "${label}"}`
    //     })
    //         .then((data) => {
    //             if (data.memberAdded) {
    //                 this.setState({
    //                     memberData: [data.memberAdded, ...this.state.memberData],
    //                     showAlert: true,
    //                     alertMessage: data.memberAdded.email,
    //                     alertParam: 'ADDED',
    //                     alertType: 'INFO'
    //                 });
    //             } else {
    //                 if (data.exists) {
    //                     this.setState({ showAlert: true, alertMessage: emailAddress, alertParam: 'ALREADYADDED', alertType: 'WARNING' });
    //                 } else {
    //                     this.setState({ showAlert: true, alertMessage: emailAddress, alertParam: 'COULDNTADD', alertType: 'ERROR' });
    //                 }
    //             }
    //         }).catch((err) => {
    //             this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
    //         });

    //     this.setState({ showAddMemberDialog: false });
    // }

    render () {
        const {
            showAddPaymentDialog,
            showAlert,
            alertType,
            alertMessage,
            paymentDialogPocketName,
            selectedUserEmail,
            selectedUserName
        } = this.state;

        return (
            <React.Fragment>
                <UserSelector handleSubmit={this.onSelection} />
                <FinanceContainer
                    selectedUser = {selectedUserEmail}
                    openAddPayment= {this.openAddPayment}
                    isFinAdmin={true} />
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
                        alertClose={this.closeAlert} />
                }
            </React.Fragment>
        );
    }
}

export default AdminFinance;

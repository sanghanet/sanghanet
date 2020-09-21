import React from 'react';
import FinanceContainer from '../../Finances/FinanceContainer/FinanceContainer';
import UserSelector from './UserSelector/UserSelector';
import AddPaymentDialog from './AddPaymentDialog/AddPaymentDialog';
import Alert from '../../../components/Alert/Alert';

class AdminFinance extends React.Component {
    state = {
        selectedUserEmail: null,
        showAddPaymentDialog: false,
        paymentDialogPocketName: '',
        showAlert: false,
        alertMessage: '',
        alertType: ''
    }

    onSelection = (email) => {
        this.setState({ selectedUserEmail: email });
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

    handleAddPayment = (amount) => {
        console.log(amount);
        console.log('FETCH: handleAddPayment');
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
        const { selectedUserEmail, showAddPaymentDialog, showAlert, alertType, alertMessage } = this.state;
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
                        pocketName = {this.state.paymentDialogPocketName}
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

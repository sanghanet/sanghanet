import React from 'react';
import Client from '../../../components/Client';
import './FinanceContainer.scss';
import FinanceDashboard from '../../../components/FinanceDashboard/FinanceDashboard';
import TransactionTabs from '../../../components/TransactionTabs/TransactionTabs';
import Alert from '../../../components/Alert/Alert';
import PropTypes from 'prop-types';

class FinanceContainer extends React.Component {
    state = {
        financeData: null,
        errorState: null
    }

    componentDidMount () {
        const userEmail = this.props.selectedUser;
        if (!userEmail) return;

        if (userEmail === 'own data') { this.getFinanceData(); } else { this.getFinanceData(userEmail); }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.selectedUser !== this.props.selectedUser) {
            this.getFinanceData(this.props.selectedUser);
        }
    }

    onError = (error) => {
        this.setState({
            errorState: error
        });
    }

    getFinanceData = async (userEmail = null) => {
        try {
            const result = await Client.fetch('/finance/financedata', {
                method: 'POST',
                body: {
                    email: userEmail
                }
            });
            this.setState({ financeData: result });
        } catch (error) {
            this.setState({ errorState: error });
        }
    }

    render () {
        const { financeData, errorState } = this.state;

        return (
            <React.Fragment>
                {errorState && <Alert
                    alertClose={() => { this.setState({ errorState: null }); }}
                    alertMsg={'There was an error! ' + errorState.message}
                    alertType={'Error'}
                />}
                {financeData ? (
                    <React.Fragment>
                        <FinanceDashboard
                            currency = {financeData[0].currency}
                            balance = {financeData.balance}
                        />
                        <TransactionTabs
                            currency = {financeData[0].currency}
                            transactions = {financeData[0].transactions}
                            onError = {this.onError}
                            isFinAdmin = {this.props.isFinAdmin}
                            openAddPayment = {this.props.openAddPayment}
                            openAddDebt = {this.props.openAddDebt}
                            openDeleteTransaction = {this.props.openDeleteTransaction}
                            activeTab = {this.props.activeTab}
                        />
                    </React.Fragment>)
                    : null }
            </React.Fragment>
        );
    }
}

FinanceContainer.propTypes = {
    selectedUser: PropTypes.string,
    isFinAdmin: PropTypes.bool.isRequired,
    openAddPayment: PropTypes.func,
    openAddDebt: PropTypes.func,
    openDeleteTransaction: PropTypes.func,
    activeTab: PropTypes.string
};

export default FinanceContainer;

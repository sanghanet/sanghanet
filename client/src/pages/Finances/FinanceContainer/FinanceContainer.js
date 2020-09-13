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
        this.getFinanceData(this.props.selectedUser);
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
            this.setState({
                financeData: result
            });
        } catch (error) {
            this.setState({
                errorState: error
            });
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
                            financePockets = {financeData.pockets}
                            onError = {this.onError} />

                        <TransactionTabs
                            currency = {financeData[0].currency}
                            transactions = {financeData[0].transactions}
                            onError = {this.onError} />
                    </React.Fragment>)
                    : (<p>Loading ...</p>) }
            </React.Fragment>
        );
    }
}

FinanceContainer.propTypes = {
    selectedUser: PropTypes.string
};

export default FinanceContainer;

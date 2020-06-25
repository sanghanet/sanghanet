import React from 'react';
import Client from '../../../components/Client';
import './FinanceContainer.scss';
import FinanceDashboard from '../../../components/FinanceDashboard/FinanceDashboard';
import TransactionTabs from '../../../components/TransactionTabs/TransactionTabs';
import Alert from '../../../components/Alert/Alert';
import PropTypes from 'prop-types';

class FinanceContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            financeData: null,
            errorState: null
        };
    }

    componentDidMount () {
        this.getFinanceData(this.props.selectedUser);
    }

    componentDidUpdate (prevProps) {
        if (prevProps.selectedUser !== this.props.selectedUser) {
            console.log(`Component updated, new email: ${this.props.selectedUser}`);
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
                headers: {
                    'Content-Type': 'application/json'
                },
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
        const { errorState, financeData } = this.state;

        return (
            <div>
                {errorState && <Alert
                    alertClose={() => { this.setState({ errorState: null }); }}
                    alertMsg={'There was an error! ' + errorState.message}
                    alertType={'Error'}
                />}
                <div>
                    {financeData ? (
                        <FinanceDashboard
                            currency = {financeData[0].currency}
                            financePockets = {financeData[0].pockets}
                            onError = {this.onError} />
                    ) : (<p>Loading ...</p>) }
                    {financeData ? (
                        <TransactionTabs
                            currency = {financeData[0].currency}
                            transactionBuffer = {financeData[0].transactionBuffer}
                            onError = {this.onError} />
                    ) : (<p>Loading ...</p>) }
                </div>
            </div>
        );
    }
}

FinanceContainer.propTypes = {
    selectedUser: PropTypes.string
};

export default FinanceContainer;

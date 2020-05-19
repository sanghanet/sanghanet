import React from 'react';
import Client from '../../../components/Client';
import './FinanceContainer.scss';
import FinanceDashboard from '../../../components/FinanceDashboard/FinanceDashboard';
import TransactionTabs from '../../../components/TransactionTabs/TransactionTabs';
import Alert from '../../../components/Alert/Alert';

class FinanceContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            financeData: null
        };
    }

    componentDidMount () {
        this.getFinanceData();
    }

    onError = (error) => {
        this.setState({
            errorState: error
        });
    }

    getFinanceData = async () => {
        try {
            const result = await Client.fetch('/user/financedata');
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
        if (this.state.errorState) {
            return (
                <Alert
                    alertClose={() => { this.setState({ errorState: null }); }}
                    alertMsg={'There was an error! ' + this.state.errorState.message}
                    alertType={'Error'}
                />
            );
        }

        return (
            <div>
                {this.state.financeData ? <FinanceDashboard
                    currency = {this.state.financeData[0].currency}
                    financePockets = {this.state.financeData[0].pockets}
                    onError = {this.onError}/> : <p>Loading ...</p>}
                {this.state.financeData ? <TransactionTabs
                    currency = {this.state.financeData[0].currency}
                    transactionBuffer = {this.state.financeData[0].transactionBuffer}
                    onError = {this.onError} /> : <p>Loading ...</p>}
            </div>
        );
    }
}

export default FinanceContainer;

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
            financeData: null,
            errorState: null
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
            const result = await Client.fetch('/finance/financedata');
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
                            onError = {this.onError}/>
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

export default FinanceContainer;

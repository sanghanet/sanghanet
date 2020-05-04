import React from 'react';
import Client from '../../components/Client';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TransactionTable from '../TransactionTable/TransactionTable';
import './TransactionTabs.scss';

class TransactionTabs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            serverTransactionData: null,
            errorState: null
        };
    }

    componentDidMount () {
        this.getTransactions();
    }

    async getTransactions () {
        try {
            const result = await Client.fetch('/user/financetransactions');
            console.log(result);
            this.setState({
                serverTransactionData: result
            });
        } catch (error) {
            console.log(error);
            this.setState({ errorState: error });
        }
    }

    generateTabs = () => {
        const tabs = [];
        const pockets = Object.entries(this.state.serverTransactionData[0].transactionBuffer);
        for (const pocket of pockets) {
            console.log(pocket[0]);
            tabs.push(
                <Tab title = {pocket[0]} eventKey = {pocket[0]} key = {pocket[0]}>
                    <TransactionTable transactionArray = {pocket[1]} errorState = {this.state.errorState}/>
                </Tab>
            );
        }
        return tabs;
    }

    render () {
        return (
            <Tabs className = 'MainTabs'>
                {this.state.serverTransactionData ? this.generateTabs() : <Tab title = {`Sorry there was an issue! ${this.state.errorState}`} eventKey = 'error'/>}
            </Tabs>
        );
    }
}

export default TransactionTabs;

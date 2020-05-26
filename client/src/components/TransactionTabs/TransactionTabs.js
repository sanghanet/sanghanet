import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TransactionTable from '../TransactionTable/TransactionTable';
import './TransactionTabs.scss';
import PropTypes from 'prop-types';

class TransactionTabs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            tabs: null
        };
    }

    componentDidMount () {
        this.generateTabs();
    }

    generateTabs = () => {
        try {
            const tabs = [];
            const pockets = Object.entries(this.props.transactionBuffer);
            for (const pocket of pockets) {
                tabs.push(
                    <Tab title = {pocket[0]} eventKey = {pocket[0]} key = {pocket[0]}>
                        <TransactionTable transactionArray = {pocket[1]} onError = {this.props.onError} />
                    </Tab>
                );
            }
            this.setState({
                tabs: tabs
            });
        } catch (error) {
            this.props.onError(error);
        }
    }

    render () {
        return (
            <Tabs className = 'MainTabs'>
                {this.state.tabs}
            </Tabs>
        );
    }
}

TransactionTabs.propTypes = {
    transactionBuffer: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired
};

export default TransactionTabs;

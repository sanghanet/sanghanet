import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TransactionTable from '../TransactionTable/TransactionTable';
import './TransactionTabs.scss';
import PropTypes from 'prop-types';

class TransactionTabs extends React.Component {
    state = {
        tabs: null
    }

    componentDidMount () {
        this.generateTabs();
    }

    componentDidUpdate (prevProps) {
        if (prevProps !== this.props) {
            this.generateTabs();
        }
    }

    generateTabs = () => {
        try {
            const tabs = [];
            const pockets = Object.entries(this.props.transactions);
            for (const pocket of pockets) {
                tabs.push(
                    <Tab title = {pocket[0]} eventKey = {pocket[0]} key = {pocket[0]}>
                        <TransactionTable
                            transactionArray = {pocket[1]}
                            isFinAdmin = {this.props.isFinAdmin}
                            openAddPayment = {this.props.openAddPayment}
                            openAddDebt = {this.props.openAddDebt}
                            onError = {this.props.onError}
                            pocket = {pocket[0]}
                        />
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
            <Tabs className = 'MainTabs' bsPrefix = 'active' defaultActiveKey = {this.props.activeTab}>
                {this.state.tabs}
            </Tabs>
        );
    }
}

TransactionTabs.propTypes = {
    transactions: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired,
    isFinAdmin: PropTypes.bool.isRequired,
    openAddPayment: PropTypes.func,
    openAddDebt: PropTypes.func,
    activeTab: PropTypes.string
};

export default TransactionTabs;

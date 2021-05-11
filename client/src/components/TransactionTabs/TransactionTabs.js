import React, { useContext } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TransactionTable from '../TransactionTable/TransactionTable';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import './TransactionTabs.scss';
import PropTypes from 'prop-types';

const TransactionTabs = (props) => {
    const { financePockets } = useContext(UIcontext).dictionary;

    return (
        <Tabs className="MainTabs" bsPrefix="active" defaultActiveKey={props.activeTab}>
            {Object.entries(props.transactions).map((pocket) => {
                const tabTitle = financePockets[pocket[0].toUpperCase()];

                return (
                    <Tab title={tabTitle} eventKey={pocket[0]} key={pocket[0]}>
                        <TransactionTable
                            transactionArray={pocket[1]}
                            isFinAdmin={props.isFinAdmin}
                            openAddPayment={props.openAddPayment}
                            openAddDebt={props.openAddDebt}
                            openDeleteTransaction={props.openDeleteTransaction}
                            onError={props.onError}
                            pocket={pocket[0]}
                        />
                    </Tab>
                );
            })}
        </Tabs>
    );
};

TransactionTabs.propTypes = {
    transactions: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired,
    isFinAdmin: PropTypes.bool.isRequired,
    openAddPayment: PropTypes.func,
    openAddDebt: PropTypes.func,
    openDeleteTransaction: PropTypes.func,
    activeTab: PropTypes.string
};

export default TransactionTabs;

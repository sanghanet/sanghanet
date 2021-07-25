import React, { useContext } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TransactionTable from '../TransactionTable/TransactionTable';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import './TransactionTabs.scss';
import PropTypes from 'prop-types';
import FinanceTransactionPropType from '../../proptypes/FinanceTransactionPropType';
import { SelectCallback } from 'react-bootstrap/esm/helpers';

interface TransactionTabsProps {
    transactions: Transactions;
    onError: (error: Error) => void;
    isFinAdmin: boolean;
    openAddPayment?: (pocket: string) => void;
    openAddDebt?: (pocket: string) => void;
    openDeleteTransaction?: (transaction: TransactionToDelete) => void;
    activeTab?: string;
    changeActiveTab?: (pocket: string) => void;
};

const TransactionTabs: React.FC<TransactionTabsProps> = (props) => {
    const {
        transactions,
        onError,
        isFinAdmin,
        openAddPayment,
        openAddDebt,
        openDeleteTransaction,
        activeTab,
        changeActiveTab
    } = props;
    const { financePockets } = useContext(UIcontext).dictionary;

    const handleSelect: SelectCallback = (eventKey, event) => {
        changeActiveTab && eventKey && changeActiveTab(eventKey);
    };

    return (
        <Tabs className="MainTabs" bsPrefix="active" activeKey={activeTab} onSelect={handleSelect}>
            {Object.entries(transactions).map(([pocketName, financeTransactions]) => {
                const tabTitle = financePockets[pocketName.toUpperCase()];

                return (
                    <Tab title={tabTitle} eventKey={pocketName} key={pocketName}>
                        <TransactionTable
                            transactionArray={financeTransactions}
                            isFinAdmin={isFinAdmin}
                            openAddPayment={openAddPayment}
                            openAddDebt={openAddDebt}
                            openDeleteTransaction={openDeleteTransaction}
                            onError={onError}
                            pocket={pocketName}
                        />
                    </Tab>
                );
            })}
        </Tabs>
    );
};

TransactionTabs.propTypes = {
    transactions: PropTypes.exact({
        membership: PropTypes.arrayOf(FinanceTransactionPropType).isRequired,
        rent: PropTypes.arrayOf(FinanceTransactionPropType).isRequired,
        event: PropTypes.arrayOf(FinanceTransactionPropType).isRequired,
        angel: PropTypes.arrayOf(FinanceTransactionPropType).isRequired
    }).isRequired,
    onError: PropTypes.func.isRequired,
    isFinAdmin: PropTypes.bool.isRequired,
    openAddPayment: PropTypes.func,
    openAddDebt: PropTypes.func,
    openDeleteTransaction: PropTypes.func,
    activeTab: PropTypes.string,
    changeActiveTab: PropTypes.func
};

export default TransactionTabs;

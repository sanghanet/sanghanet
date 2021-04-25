import React, { useContext } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TransactionTable from '../TransactionTable/TransactionTable';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import './TransactionTabs.scss';
import PropTypes from 'prop-types';
import TransactionsPropType from '../../proptypes/TransactionsPropType';

type TransactionTabsProps = {
    transactions: Transactions;
    onError: (error: Error) => void;
    isFinAdmin: boolean;
    openAddPayment?: (pocket: string) => void;
    openAddDebt?: (pocket: string) => void;
    openDeleteTransaction?: (transaction: TransactionToDelete) => void;
    activeTab?: string;
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
    } = props;
    const { financePockets } = useContext(UIcontext).dictionary;

    return (
        <Tabs className='MainTabs' bsPrefix='active' defaultActiveKey={activeTab}>
            {Object.entries(transactions).map((pocket) => {
                const tabTitle = financePockets[pocket[0].toUpperCase()];

                return (
                    <Tab title={tabTitle} eventKey={pocket[0]} key={pocket[0]}>
                        <TransactionTable
                            transactionArray={pocket[1]}
                            isFinAdmin={isFinAdmin}
                            openAddPayment={openAddPayment}
                            openAddDebt={openAddDebt}
                            openDeleteTransaction={openDeleteTransaction}
                            onError={onError}
                            pocket={pocket[0]}
                        />
                    </Tab>
                );
            })}
        </Tabs>
    );
};

TransactionTabs.propTypes = {
    transactions: TransactionsPropType,
    onError: PropTypes.func.isRequired,
    isFinAdmin: PropTypes.bool.isRequired,
    openAddPayment: PropTypes.func,
    openAddDebt: PropTypes.func,
    openDeleteTransaction: PropTypes.func,
    activeTab: PropTypes.string,
};

export default TransactionTabs;

import React, { useEffect, useState } from 'react';
import Client from '../../../components/Client';
import './FinanceContainer.scss';
import FinanceDashboard from '../../../components/FinanceDashboard/FinanceDashboard';
import TransactionTabs from '../../../components/TransactionTabs/TransactionTabs';
import Alert from '../../../components/Alert/Alert';
import PropTypes from 'prop-types';

const FinanceContainer = (props) => {
    const { selectedUser, isFinAdmin, openAddPayment, openAddDebt, openDeleteTransaction, activeTab } = props;
    const [financeData, setFinanceData] = useState(null);
    const [errorState, setErrorState] = useState(null);
    const [reRender, setReRender] = useState(0); // fine HACK to rerender Component when new data is available.

    useEffect(() => {
        if (selectedUser === 'own data') {
            getFinanceData();
        } else if (selectedUser) {
            getFinanceData(selectedUser);
        }
    }, [selectedUser])


    const onError = (error) => setErrorState(error);

    const sortByDueDate = (t1, t2) => new Date(t2.dueDate) - new Date(t1.dueDate);

    const getFinanceData = async (userEmail = null) => {
        try {
            const result = await Client.fetch('/finance/financedata', {
                method: 'POST',
                body: {
                    email: userEmail
                }
            });

            result[0].transactions.membership.sort(sortByDueDate);
            result[0].transactions.rent.sort(sortByDueDate);
            result[0].transactions.event.sort(sortByDueDate);
            result[0].transactions.angel.sort(sortByDueDate);

            setFinanceData(result);
            setReRender(Date.now());
        } catch (error) {
            setErrorState(error);
        }
    }

    return (
        <React.Fragment>
            {errorState && <Alert
                alertClose={() => { setErrorState(null); }}
                alertMsg={'There was an error! ' + errorState.message}
                alertType={'Error'}
            />}
            {financeData ? (
                <React.Fragment>
                    <FinanceDashboard
                        key={reRender}
                        currency={financeData[0].currency}
                        balance={financeData.balance}
                        onError={onError}
                    />
                    <TransactionTabs
                        currency={financeData[0].currency}
                        transactions={financeData[0].transactions}
                        onError={onError}
                        isFinAdmin={isFinAdmin}
                        openAddPayment={openAddPayment}
                        openAddDebt={openAddDebt}
                        openDeleteTransaction={openDeleteTransaction}
                        activeTab={activeTab}
                    />
                </React.Fragment>)
                : null}
        </React.Fragment>
    );
}

FinanceContainer.propTypes = {
    selectedUser: PropTypes.string,
    isFinAdmin: PropTypes.bool.isRequired,
    openAddPayment: PropTypes.func,
    openAddDebt: PropTypes.func,
    openDeleteTransaction: PropTypes.func,
    activeTab: PropTypes.string
};

export default FinanceContainer;

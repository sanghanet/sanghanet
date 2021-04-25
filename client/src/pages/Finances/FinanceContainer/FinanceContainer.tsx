import React, { useEffect, useState } from 'react';
import Client from '../../../components/Client';
import './FinanceContainer.scss';
import FinanceDashboard from '../../../components/FinanceDashboard/FinanceDashboard';
import TransactionTabs from '../../../components/TransactionTabs/TransactionTabs';
import Alert from '../../../components/Alert/Alert';
import PropTypes from 'prop-types';

interface FinanceContainerProps {
    selectedUser?: string;
    isFinAdmin: boolean;
    openAddPayment?: (pocket: string) => void;
    openAddDebt?: (pocket: string) => void;
    openDeleteTransaction?: (transaction: TransactionToDelete) => void;
    activeTab?: string;
}

const FinanceContainer: React.FC<FinanceContainerProps> = (props) => {
    const {
        selectedUser,
        isFinAdmin,
        openAddPayment,
        openAddDebt,
        openDeleteTransaction,
        activeTab,
    } = props;
    const [financeData, setFinanceData] = useState<FinanceAccountSchema | null>(null);
    const [errorState, setErrorState] = useState<Error | null>(null);
    const [reRender, setReRender] = useState(0); // fine HACK to rerender Component when new data is available.

    useEffect(() => {
        if (selectedUser === 'own data') {
            getFinanceData();
        } else if (selectedUser) {
            getFinanceData(selectedUser);
        }
    }, [selectedUser]);
 
    const onError = (error: Error): void => setErrorState(error);

    const sortByDueDate = (t1: FinanceTransactionSchema, t2: FinanceTransactionSchema): number => {
        return new Date(t2.dueDate).getTime() - new Date(t1.dueDate).getTime();
    };

    const getFinanceData = async (userEmail: string | null = null) => {
        try {
            const result: FinanceAccountSchema = await Client.fetch('/finance/financedata', {
                method: 'POST',
                body: {
                    email: userEmail,
                },
            });

            result.transactions.membership.sort(sortByDueDate);
            result.transactions.rent.sort(sortByDueDate);
            result.transactions.event.sort(sortByDueDate);
            result.transactions.angel.sort(sortByDueDate);

            setFinanceData(result);
            setReRender(Date.now());
        } catch (error) {
            setErrorState(error);
        }
    };

    return (
        <React.Fragment>
            {errorState && (
                <Alert
                    alertClose={() => {
                        setErrorState(null);
                    }}
                    
                    alertMsg={'There was an error! ' + errorState.message}
                    alertType={'ERROR'}
                />
            )}
            {financeData && (
                <React.Fragment>
                    <FinanceDashboard
                        key={reRender}
                        balance={financeData.balance}
                        onError={onError}
                    />
                    <TransactionTabs
                        transactions={financeData.transactions}
                        onError={onError}
                        isFinAdmin={isFinAdmin}
                        openAddPayment={openAddPayment}
                        openAddDebt={openAddDebt}
                        openDeleteTransaction={openDeleteTransaction}
                        activeTab={activeTab}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

FinanceContainer.propTypes = {
    selectedUser: PropTypes.string,
    isFinAdmin: PropTypes.bool.isRequired,
    openAddPayment: PropTypes.func,
    openAddDebt: PropTypes.func,
    openDeleteTransaction: PropTypes.func,
    activeTab: PropTypes.string,
};

export default FinanceContainer;

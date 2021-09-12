import React, { useEffect, useState } from 'react';
import Client from '../../../components/Client';
import FinanceDashboard from '../../../components/FinanceDashboard/FinanceDashboard';
import TransactionTabs from '../../../components/TransactionTabs/TransactionTabs';
import TransactionFilterAccordion from '../../Admins/AdminFinance/TransactionFilterAccordion/TransactionFilterAccordion';
import Alert from '../../../components/Alert/Alert';
import PropTypes from 'prop-types';
interface FinanceContainerProps {
    selectedUser?: string;
    isFinAdmin: boolean;
    openAddPayment?: (pocket: string) => void;
    openAddDebt?: (pocket: string) => void;
    openDeleteTransaction?: (transaction: TransactionToDelete) => void;
    activeTabFromAdmin?: string;
}

enum DeletedFilter {
    ALL = 'ALL',
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
}

const FinanceContainer: React.FC<FinanceContainerProps> = (props) => {
    const {
        selectedUser,
        isFinAdmin,
        openAddPayment,
        openAddDebt,
        openDeleteTransaction,
        activeTabFromAdmin,
    } = props;
    const [financeData, setFinanceData] = useState<FinanceAccount | null>(null);
    const [errorState, setErrorState] = useState(0);
    const [reRender, setReRender] = useState(0); // fine HACK to rerender Component when new data is available.
    const [activeTab, setActiveTab] = useState(activeTabFromAdmin);
    const [deletedTransactionsFilter, setDeletedTransactionsFilter] = useState<DeletedFilter>(
        isFinAdmin ? DeletedFilter.ALL : DeletedFilter.ACTIVE
    );
    const [dueDateFromFilter, setDueDateFromFilter] = useState<Date | null>(null);
    const [dueDateToFilter, setDueDateToFilter] = useState<Date | null>(null);

    const setLastDayOfMonth = (date: Date): Date => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = new Date(year, month + 1, 0).getDate();
        return new Date(year, month, day);
    };

    const setFirstDayOfMonth = (date: Date): Date => {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };

    const handleDueDateFromChange = (date: Date | null): void => {
        if (date) {
            date = setFirstDayOfMonth(date);
        }
        if (dueDateToFilter && date && date > dueDateToFilter) {
            setDueDateFromFilter(setFirstDayOfMonth(dueDateToFilter));
            setDueDateToFilter(setLastDayOfMonth(date));
        } else {
            setDueDateFromFilter(date);
        }
    };

    const handleDueDateToChange = (date: Date | null): void => {
        if (date) {
            date = setLastDayOfMonth(date);
        }
        if (dueDateFromFilter && date && date < dueDateFromFilter) {
            setDueDateToFilter(setLastDayOfMonth(dueDateFromFilter));
            setDueDateFromFilter(setFirstDayOfMonth(date));
        } else {
            setDueDateToFilter(date);
        }
    };

    const changeActiveTab = (pocket: string): void => {
        setActiveTab(pocket);
    };

    const sortByDueDate = (t1: FinanceTransaction, t2: FinanceTransaction): number => {
        return new Date(t2.dueDate).getTime() - new Date(t1.dueDate).getTime();
    };

    const getFinanceData = async (userEmail: string | null = null): Promise<void> => {
        try {
            const result: FinanceAccount = await Client.fetch('/finance/financedata', {
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
            setErrorState(error as number);
        }
    };

    useEffect(() => {
        if (selectedUser === 'own data') {
            getFinanceData();
        } else if (selectedUser) {
            getFinanceData(selectedUser);
        }
    }, [selectedUser]);

    const handleError = (): void => setErrorState(1);
    const handleDeletedFilterChange = (filterValue: DeletedFilter): void => {
        setDeletedTransactionsFilter(filterValue);
    };

    const transactionsFilterHelper = (
        transactions: Transactions,
        predicate: (x: FinanceTransaction) => boolean
    ): Transactions => {
        for (const key in transactions) {
            transactions[key as Pocket] = transactions[key as Pocket].filter(predicate);
        }

        return transactions;
    };

    const filterTransactionsByDeletedFlag = (transactions: Transactions): Transactions => {
        const filter = (showDeleted: boolean): Transactions => {
            const predicate = (t: FinanceTransaction): boolean =>
                showDeleted ? !!t.deleted : !t.deleted;
            return transactionsFilterHelper(transactions, predicate);
        };

        switch (deletedTransactionsFilter) {
            case DeletedFilter.ACTIVE:
                return filter(false);
            case DeletedFilter.DELETED:
                return filter(true);
            default:
                return transactions;
        }
    };

    const filterTransactionsByDueDate = (transactions: Transactions): Transactions => {
        if (dueDateFromFilter != null) {
            const predicate = (t: FinanceTransaction): boolean =>
                new Date(t.dueDate) >= dueDateFromFilter;
            transactions = transactionsFilterHelper(transactions, predicate);
        }

        if (dueDateToFilter != null) {
            const predicate = (t: FinanceTransaction): boolean =>
                dueDateToFilter >= new Date(t.dueDate);
            transactions = transactionsFilterHelper(transactions, predicate);
        }
        return transactions;
    };

    const filterTransactions = (financeTransactions: Transactions): Transactions => {
        let transactions: Transactions = JSON.parse(JSON.stringify(financeTransactions));
        transactions = filterTransactionsByDeletedFlag(transactions);
        transactions = filterTransactionsByDueDate(transactions);
        return transactions;
    };

    return (
        <>
            {errorState && (
                <Alert
                    alertClose={(): void => {
                        setErrorState(0);
                    }}
                    alertMsg="There was an error! "
                    alertType="ERROR"
                />
            )}
            {financeData && (
                <>
                    <FinanceDashboard
                        key={reRender}
                        balance={financeData.balance}
                        onError={handleError}
                        onClick={changeActiveTab}
                    />
                    {(isFinAdmin || !isFinAdmin) && (
                        <TransactionFilterAccordion
                            dueDateFromFilter={dueDateFromFilter}
                            dueDateToFilter={dueDateToFilter}
                            deletedTransactionsFilter={deletedTransactionsFilter}
                            handleDueDateFromChange={handleDueDateFromChange}
                            handleDueDateToChange={handleDueDateToChange}
                            handleDeletedFilterChange={handleDeletedFilterChange}
                        />
                    )}
                    <TransactionTabs
                        transactions={filterTransactions(financeData.transactions)}
                        onError={handleError}
                        isFinAdmin={isFinAdmin}
                        openAddPayment={openAddPayment}
                        openAddDebt={openAddDebt}
                        openDeleteTransaction={openDeleteTransaction}
                        activeTab={activeTab}
                        changeActiveTab={changeActiveTab}
                    />
                </>
            )}
        </>
    );
};

FinanceContainer.propTypes = {
    selectedUser: PropTypes.string,
    isFinAdmin: PropTypes.bool.isRequired,
    openAddPayment: PropTypes.func,
    openAddDebt: PropTypes.func,
    openDeleteTransaction: PropTypes.func,
    activeTabFromAdmin: PropTypes.string,
};

export default FinanceContainer;

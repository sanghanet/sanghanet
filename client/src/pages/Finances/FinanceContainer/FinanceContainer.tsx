import React, { useEffect, useState } from 'react';
import Client from '../../../components/Client';
import './FinanceContainer.scss';
import FinanceDashboard from '../../../components/FinanceDashboard/FinanceDashboard';
import TransactionTabs from '../../../components/TransactionTabs/TransactionTabs';
import Alert from '../../../components/Alert/Alert';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

interface FinanceContainerProps {
    selectedUser?: string;
    isFinAdmin: boolean;
    openAddPayment?: (pocket: string) => void;
    openAddDebt?: (pocket: string) => void;
    openDeleteTransaction?: (transaction: TransactionToDelete) => void;
    activeTabFromAdmin?: string;
}

enum DeletedFilter {
    All = 'All',
    Active = 'Active',
    Deleted = 'Deleted',
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
        DeletedFilter.All
    );

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
    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        event.preventDefault();
        setDeletedTransactionsFilter(event.target.value as DeletedFilter);
    };

    const filterTransactions = (financeTransactions: Transactions): Transactions => {
        const transactions: Transactions = JSON.parse(JSON.stringify(financeTransactions));

        const filter = (showDeleted: boolean): Transactions => {
            for (const key in transactions) {
                transactions[key as Pocket] = transactions[key as Pocket].filter((finTransaction) =>
                    showDeleted ? finTransaction.deleted : !finTransaction.deleted
                );
            }

            return transactions;
        };

        switch (deletedTransactionsFilter) {
            case DeletedFilter.Active: return filter(false);
            case DeletedFilter.Deleted: return filter(true);
            default: return financeTransactions;
        }
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
                    <Form className="transactions-filter-form">
                        <Form.Group className="deleted-filter">
                            <Form.Label>Show deleted</Form.Label>
                            <Form.Control
                                id="deletedFilter"
                                onChange={handleChange}
                                defaultValue={deletedTransactionsFilter}
                                as="select"
                            >
                                <option value={DeletedFilter.All}>All</option>
                                <option value={DeletedFilter.Active}>Active</option>
                                <option value={DeletedFilter.Deleted}>Deleted</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
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

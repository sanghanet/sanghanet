import React, { useEffect, useState } from 'react';
import Client from '../../../components/Client';
import './FinanceContainer.scss';
import FinanceDashboard from '../../../components/FinanceDashboard/FinanceDashboard';
import TransactionTabs from '../../../components/TransactionTabs/TransactionTabs';
import Alert from '../../../components/Alert/Alert';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { addMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    const [deletedTransactionsFilter, setDeletedTransactionsFilter] = useState<DeletedFilter>(isFinAdmin ? DeletedFilter.All : DeletedFilter.Active);
    const [dueDateFromFilter, setDueDateFromFilter] = useState<Date | null>(null);
    const [dueDateToFilter, setDueDateToFilter] = useState<Date | null>(null);
    const dateFormat = 'MM/yyyy';
    const minDate = addMonths(new Date(), -18);
    const maxDate = addMonths(new Date(), 6);

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
        } else if (date) {
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
    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        event.preventDefault();
        setDeletedTransactionsFilter(event.target.value as DeletedFilter);
    };

    const filterTransactionsByDeletedFlag = (financeTransactions: Transactions): Transactions => {
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
                    {isFinAdmin && (
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
                            <Form.Group className="date-picker">
                                <Form.Label>From start of</Form.Label>
                                <DatePicker
                                    id="due-date-from"
                                    className="form-control"
                                    selected={dueDateFromFilter}
                                    dateFormat={dateFormat}
                                    onChange={handleDueDateFromChange}
                                    showMonthYearPicker
                                    showPopperArrow={false}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    showDisabledMonthNavigation
                                    // isClearable
                                />
                                <Form.Label>To end of</Form.Label>
                                <DatePicker
                                    id="due-date-to"
                                    className="form-control"
                                    selected={dueDateToFilter}
                                    dateFormat={dateFormat}
                                    onChange={handleDueDateToChange}
                                    showMonthYearPicker
                                    showPopperArrow={false}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    showDisabledMonthNavigation
                                    // isClearable
                                />
                            </Form.Group>
                        </Form>
                    )}
                    <TransactionTabs
                        transactions={filterTransactionsByDeletedFlag(financeData.transactions)}
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

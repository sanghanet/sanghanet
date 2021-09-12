import React, { useContext, useEffect, useState } from 'react';
import Client from '../../../components/Client';
import '../../Admins/AdminFinance/TransactionFilterAccordion/TransactionFilterAccordion.scss';
import FinanceDashboard from '../../../components/FinanceDashboard/FinanceDashboard';
import TransactionTabs from '../../../components/TransactionTabs/TransactionTabs';
import Alert from '../../../components/Alert/Alert';
import PropTypes from 'prop-types';
import { ReactComponent as Arrow } from '../../../components/Form/formIcons/arrow-up.svg';
import { Accordion, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { addMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { UIcontext } from '../../../components/contexts/UIcontext/UIcontext';

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
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const dateFormat = 'MM/yyyy';
    const minDate = addMonths(new Date(), -18);
    const maxDate = addMonths(new Date(), 6);

    const { deletedTransactionsFilterTypes, transactionFilterLabels } = useContext(UIcontext).dictionary;

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
        console.log('1st');
        if (date) {
            date = setLastDayOfMonth(date);
            console.log(`2nd ${date.toDateString()}`);
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
    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        event.preventDefault();
        setDeletedTransactionsFilter(event.target.value as DeletedFilter);
    };

    const transactionsFilterHelper = (transactions: Transactions, predicate: (x: FinanceTransaction) => boolean): Transactions => {
        for (const key in transactions) {
            transactions[key as Pocket] = transactions[key as Pocket].filter(predicate);
        }

        return transactions;
    };

    const filterTransactionsByDeletedFlag = (transactions: Transactions): Transactions => {
        const filter = (showDeleted: boolean): Transactions => {
            const predicate = (t: FinanceTransaction): boolean => showDeleted ? !!t.deleted : !t.deleted;
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
            const predicate = (t: FinanceTransaction): boolean => new Date(t.dueDate) >= dueDateFromFilter;
            transactions = transactionsFilterHelper(transactions, predicate);
        }

        if (dueDateToFilter != null) {
            const predicate = (t: FinanceTransaction): boolean => dueDateToFilter >= new Date(t.dueDate);
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
                        <Accordion className="transactions-filter-accordion">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle onClick={(): void => setDropDownVisible((prevState) => !prevState)} as={Button} variant="primary" eventKey="0">
                                        <span className="arrow-icon">
                                            <Arrow className={dropDownVisible ? 'arrowUp' : 'arrowDown'} />
                                        </span>
                                        Szűrés
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form className="filter-box">
                                            <Form.Group as={Row} className="deleted-filter">
                                                <Form.Label as={Col} xs="5" sm="3" lg="2" className="label">{transactionFilterLabels.SHOW_DELETED}</Form.Label>
                                                <Col xs="5" sm="3" lg="2">
                                                    <Form.Control
                                                        onChange={handleChange}
                                                        defaultValue={deletedTransactionsFilter}
                                                        as="select"
                                                    >
                                                        <option value={DeletedFilter.ALL}>{deletedTransactionsFilterTypes[DeletedFilter.ALL]}</option>
                                                        <option value={DeletedFilter.ACTIVE}>{deletedTransactionsFilterTypes[DeletedFilter.ACTIVE]}</option>
                                                        <option value={DeletedFilter.DELETED}>{deletedTransactionsFilterTypes[DeletedFilter.DELETED]}</option>
                                                    </Form.Control>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label as={Col} xs="5" sm="3" lg="2" className="label">{transactionFilterLabels.DUE_DATE_FROM}</Form.Label>
                                                <Col xs="5" sm="3" lg="2">
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
                                                        withPortal
                                                        autoComplete="off"
                                                        isClearable
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label as={Col} xs="5" sm="3" lg="2" className="label">{transactionFilterLabels.DUE_DATE_TO}</Form.Label>
                                                <Col xs="5" sm="3" lg="2">
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
                                                        withPortal
                                                        autoComplete="off"
                                                        isClearable
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
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

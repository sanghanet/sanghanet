import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import { formatMoney, formatDate } from '../../languages/InternationalizationMethods';
import './TransactionTable.scss';
import { ReactComponent as Plus } from '../icons/plus.svg';
import { ReactComponent as Minus } from '../icons/minus.svg';
import { ReactComponent as Bin } from '../icons/bin.svg';
import FinanceTransactionPropType from '../../proptypes/FinanceTransactionPropType';

type TransactionTableProps = {
    transactionArray: Array<FinanceTransactionSchema>;
    onError: (error: Error) => void;
    isFinAdmin: boolean;
    openAddPayment?: (pocket: string) => void;
    openAddDebt?: (pocket: string) => void;
    openDeleteTransaction?: (transaction: TransactionToDelete) => void;
    pocket: string;
};

const TransactionTable: React.FC<TransactionTableProps> = (props) => {
    const {
        transactionArray,
        onError,
        isFinAdmin,
        openAddPayment,
        openAddDebt,
        openDeleteTransaction,
        pocket,
    } = props;

    const { ADDNEWPAYMENT, ADDNEWDEBIT, DESCRIPTION, DUEDATE, AMOUNT } = useContext(
        UIcontext
    ).dictionary.transactionTable;
    const lang = localStorage.getItem('lang');

    const onDeleteTransaction: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        const { description, amount, currency, dueDate} = event.currentTarget.dataset;
        const transaction = {
            id: event.currentTarget.id,
            pocket: pocket,
            description: description || '',
            amount: parseInt(amount || ''),
            currency: currency || '',
            dueDate: new Date(dueDate || ''),
        };

        openDeleteTransaction && openDeleteTransaction(transaction);
    };

    return (
        <Table hover bordered variant='dark' className='fn-admin-table'>
            <thead>
                {isFinAdmin && (
                    <tr>
                        <th colSpan={4} className='trans'>
                            <Button
                                className='trans-btn'
                                variant='success'
                                onClick={() => openAddPayment!(pocket)}>
                                <Plus />
                                {ADDNEWPAYMENT}
                            </Button>
                            <Button
                                className='trans-btn'
                                variant='danger'
                                onClick={() => openAddDebt!(pocket)}>
                                <Minus />
                                {ADDNEWDEBIT}
                            </Button>
                        </th>
                    </tr>
                )}

                <tr>
                    <th>{DESCRIPTION}</th>
                    <th>{DUEDATE}</th>
                    <th>{AMOUNT}</th>
                    {isFinAdmin && <th className='delete-column-header'></th>}
                </tr>
            </thead>

            <tbody>
                {transactionArray.map((transaction, index) => {
                    const dueDate = formatDate(lang, new Date(transaction.dueDate));

                    return (
                        <tr className={`finance-row ${transaction.status}`} key={index}>
                            <td className='description-cell'>{transaction.description}</td>
                            <td className='date-cell'>{dueDate}</td>
                            <td className='amount-cell'>{formatMoney(lang, transaction.amount)}</td>
                            {isFinAdmin && (
                                <td className='delete-cell'>
                                    {transaction.status !== 'deleted' && (
                                        <Button
                                            variant='outline-danger'
                                            id={transaction._id}
                                            onClick={onDeleteTransaction}
                                            data-description={transaction.description}
                                            data-amount={transaction.amount}
                                            data-currency={transaction.currency}
                                            data-duedate={dueDate}>
                                            <Bin className='delete-transaction' />
                                        </Button>
                                    )}
                                </td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

TransactionTable.propTypes = {
    transactionArray: PropTypes.arrayOf(FinanceTransactionPropType).isRequired,
    onError: PropTypes.func.isRequired,
    isFinAdmin: PropTypes.bool.isRequired,
    openAddPayment: PropTypes.func,
    openAddDebt: PropTypes.func,
    openDeleteTransaction: PropTypes.func,
    pocket: PropTypes.string.isRequired,
};

export default TransactionTable;

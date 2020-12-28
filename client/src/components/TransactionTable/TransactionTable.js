import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { UIcontext } from '../contexts/UIcontext/UIcontext'
import { formatMoney, formatDate } from '../../languages/InternationalizationMethods';
import './TransactionTable.scss';
import { ReactComponent as Plus } from '../icons/plus.svg';
import { ReactComponent as Minus } from '../icons/minus.svg';
import { ReactComponent as Bin } from '../icons/bin.svg';

const TransactionTable = (props) => {

    const { ADDNEWPAYMENT, ADDNEWDEBIT, DESCRIPTION, DUEDATE, AMOUNT } = useContext(UIcontext).dictionary.transactionTable;
    const lang = localStorage.getItem('lang');

    const openAddPayment = () => { props.openAddPayment(props.pocket); }
    const openAddDebt = () => { props.openAddDebt(props.pocket); }

    const onDeleteTransaction = (event) => {
        event.stopPropagation();

        const transaction = {
            id: event.currentTarget.id,
            pocket: props.pocket,
            description: event.currentTarget.dataset.description,
            amount: event.currentTarget.dataset.amount,
            currency: event.currentTarget.dataset.currency,
            duedate: event.currentTarget.dataset.duedate
        };

        props.openDeleteTransaction(transaction);
    }

    const { isFinAdmin } = props;

    return (
        <Table hover bordered variant="dark" className="fn-admin-table">
            <thead>

                {isFinAdmin &&
                    <tr>
                        <th colSpan='4' className="trans">
                            <Button className="trans-btn" variant="success" onClick={openAddPayment}>
                                <Plus />
                                {ADDNEWPAYMENT}
                            </Button>
                            <Button className="trans-btn" variant="danger" onClick={openAddDebt}>
                                <Minus />
                                {ADDNEWDEBIT}
                            </Button>
                        </th>
                    </tr>
                }

                <tr>
                    <th>{DESCRIPTION}</th>
                    <th>{DUEDATE}</th>
                    <th>{AMOUNT}</th>
                    { isFinAdmin && <th className="delete-column-header"></th> }
                </tr>

            </thead>

            <tbody>
                {props.transactionArray.map((transaction, i) => {
                    const dueDate = formatDate(lang, new Date(transaction.dueDate));

                    return (
                        <tr className={`finance-row ${transaction.status}`} key = {transaction._id}>
                            <td className='description-cell'>{transaction.description}</td>
                            <td className='date-cell'>{dueDate}</td>
                            <td className='amount-cell'>{formatMoney(lang, transaction.amount)}</td>
                            { isFinAdmin &&
                                <td className='delete-cell'>
                                    {
                                        transaction.status !== 'deleted' && (
                                            <Button
                                                variant='outline-danger'
                                                id={transaction._id}
                                                onClick={onDeleteTransaction}
                                                data-description={transaction.description}
                                                data-amount={transaction.amount}
                                                data-currency={transaction.currency}
                                                data-duedate={dueDate}
                                            >
                                                <Bin className='delete-transaction' />
                                            </Button>
                                        )
                                    }
                                </td>
                            }
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

TransactionTable.propTypes = {
    transactionArray: PropTypes.array.isRequired,
    onError: PropTypes.func.isRequired,
    isFinAdmin: PropTypes.bool.isRequired,
    openAddPayment: PropTypes.func,
    openAddDebt: PropTypes.func,
    openDeleteTransaction: PropTypes.func,
    pocket: PropTypes.string
};

export default TransactionTable;

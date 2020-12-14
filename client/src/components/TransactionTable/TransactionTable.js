import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { UIcontext } from '../contexts/UIcontext/UIcontext'
import './TransactionTable.scss';
import { ReactComponent as Plus } from '../icons/plus.svg';
import { ReactComponent as Minus } from '../icons/minus.svg';
import { ReactComponent as Bin } from '../icons/bin.svg';

const TransactionTable = (props) => {
    const dueDates = props.transactionArray.map((transaction) => {
        const date = transaction.dueDate.split('-');

        return {
            year: date[0],
            month: date[1],
            day: date[2].substring(0, 2)
        };
    });

    const { dictionary, lang } = useContext(UIcontext)
    const { date, transactionTable } = dictionary;
    const { MONTHS } = date;
    const { ADDNEWPAYMENT, ADDNEWDEBIT, DESCRIPTION, DUEDATE, AMOUNT } = transactionTable;

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
                    const {year, month, day} = dueDates[i];
                    const monthName = MONTHS[(month)-1];

                    return (
                        <tr className={`finance-row ${transaction.status}`} key = {transaction._id}>
                            <td className='description-cell'>{transaction.description}</td>
                            <td className='date-cell'>{
                                lang === 'hu' ?
                                    `${year} ${monthName} ${day}.` :
                                    `${monthName} ${day}, ${year}`
                                }
                            </td>
                            <td className='amount-cell'>{transaction.amount} {transaction.currency}</td>
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
                                                data-duedate={`${year} ${monthName} ${day}`}
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

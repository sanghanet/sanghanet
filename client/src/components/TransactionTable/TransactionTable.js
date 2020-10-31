import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './TransactionTable.scss';
import { ReactComponent as Plus } from '../icons/plus.svg';
import { ReactComponent as Minus } from '../icons/minus.svg';
import { ReactComponent as Bin } from '../icons/bin.svg';

class TransactionTable extends React.Component {
    state = {
        rows: null
    }

    componentDidMount () {
        this.createRows();
    }

    componentDidUpdate (prevProps) {
        if (prevProps.transactionArray !== this.props.transactionArray) {
            this.createRows();
        }
    }

    openAddPayment = () => {
        this.props.openAddPayment(this.props.pocket);
    }

    openAddDebt = () => {
        this.props.openAddDebt(this.props.pocket);
    }

    onDeleteTransaction = (event) => {
        event.stopPropagation();
        const transaction = {
            id: event.currentTarget.id,
            pocket: this.props.pocket,
            description: event.currentTarget.dataset.description,
            amount: event.currentTarget.dataset.amount,
            currency: event.currentTarget.dataset.currency,
            duedate: event.currentTarget.dataset.duedate
        };
        this.props.openDeleteTransaction(transaction);
    }

    createRows = () => {
        const { isFinAdmin } = this.props;
        try {
            const rows = [];
            for (const transaction of this.props.transactionArray) {
                const dueDateString = new Date(transaction.dueDate).toDateString();
                rows.push(
                    <tr className = {transaction.status} key = {transaction._id}>
                        <td>{transaction.description}</td>
                        <td>{dueDateString}</td>
                        <td>{transaction.amount} {transaction.currency}</td>
                        { isFinAdmin &&
                            <>
                                { transaction.status !== 'deleted'
                                    ? <td>
                                        <Button
                                            variant='outline-danger'
                                            id={transaction._id}
                                            onClick={this.onDeleteTransaction}
                                            data-description={transaction.description}
                                            data-amount={transaction.amount}
                                            data-currency={transaction.currency}
                                            data-duedate={dueDateString}
                                        >
                                            <Bin className='delete-transaction' />
                                        </Button>
                                    </td>
                                    : <td></td>
                                }
                            </>
                        }
                    </tr>
                );
            }
            this.setState({ rows: rows });
        } catch (error) {
            this.props.onError(error);
        }
    }

    render () {
        const { isFinAdmin } = this.props;
        const column = isFinAdmin ? 4 : 3;
        return (
            <Table hover bordered variant="dark" className="fn-admin-table">
                <thead>
                    {this.props.isFinAdmin &&
                        <React.Fragment>
                            <tr>
                                <th colSpan={column} className="trans">
                                    <Button className="trans-btn" variant="success" onClick={this.openAddPayment}>
                                        <Plus />
                                            Add new payment
                                    </Button>
                                    <Button className="trans-btn" variant="danger" onClick={this.openAddDebt}>
                                        <Minus />
                                            Add new debit
                                    </Button>
                                </th>
                            </tr>
                        </React.Fragment>
                    }

                    <tr>
                        <th>Description</th>
                        <th>Due date</th>
                        <th>Amount</th>
                        { isFinAdmin &&
                            <th>Delete</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {this.state.rows}
                </tbody>
            </Table>
        );
    }
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

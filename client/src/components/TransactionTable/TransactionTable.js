import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import './TransactionTable.scss';

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

    createRows () {
        try {
            const rows = [];
            for (const transaction of this.props.transactionArray) {
                rows.push(
                    <tr key = {transaction._id}>
                        <td>{transaction.description}</td>
                        <td>{transaction.amount} {transaction.currency}</td>
                    </tr>
                );
            }
            this.setState({
                rows: rows
            });
        } catch (error) {
            this.props.onError(error);
        }
    }

    render () {
        return (
            <Table hover bordered variant="dark">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
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
    onError: PropTypes.func.isRequired
};

export default TransactionTable;

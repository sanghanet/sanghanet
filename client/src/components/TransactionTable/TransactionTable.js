import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

class TransactionTable extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            rows: null,
            content: this.props.transactionArray
        };
    }

    componentDidMount () {
        this.createRows();
    }

    createRows () {
        try {
            const rows = [];
            for (const transaction of this.state.content) {
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

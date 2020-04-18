import React from 'react';
import Client from '../../components/Client';
import Table from 'react-bootstrap/Table';

class TransactionTable extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <Table hover bordered variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                        <th>Transaction date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Test Description</td>
                        <td>1986.02.20</td>
                        <td>5000 HUF</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default TransactionTable;

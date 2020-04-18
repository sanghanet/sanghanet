import React from 'react';
import Client from '../../components/Client';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TransactionTable from '../TransactionTable/TransactionTable';

class TransactionTabs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    componentDidMount () {
        Client.fetch('/user/financetransactions')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render () {
        return (
            <Tabs defaultActiveKey = "test">
                <Tab title="Test" eventKey = "test" >
                    <TransactionTable/>
                </Tab>
                <Tab>TEST2</Tab>
                <Tab>TEST3</Tab>
            </Tabs>
        );
    }
}

export default TransactionTabs;

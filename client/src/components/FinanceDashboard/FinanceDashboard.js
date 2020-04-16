import React from 'react';
import Client from '../../components/Client';
import './FinanceDashboard.scss';

class FinanceDashboard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            balances: []
        };
    }

    componentDidMount () {
        Client.fetch('/user/financeoverview')
            .then((res) => {
                const entries = [];
                console.log(res[0]);
                const pockets = Object.entries(res[0].pockets);
                for (const pocket of pockets) {
                    entries.push(
                        <div key = {pocket[0]} >{`Current balance of ${pocket[0]} pocket: ${pocket[1].currentBalance.value} ${res[0].currency}`}</div>
                    );
                }
                this.setState({ balances: entries });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render () {
        return (
            <div className = "overview" >
                {this.state.balances}
            </div>
        );
    };
}

export default FinanceDashboard;

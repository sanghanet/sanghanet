import React from 'react';
import './FinanceDashboard.scss';
import PropTypes from 'prop-types';
import { ReactComponent as Membership } from '../icons/fin_membership.svg';
import { ReactComponent as Rent } from '../icons/fin_rent.svg';
import { ReactComponent as Event } from '../icons/fin_event.svg';
import { ReactComponent as Angel } from '../icons/fin_angel.svg';

class FinanceDashboard extends React.Component {
    state = {
        balances: [],
        errorState: null
    }

    componentDidMount () {
        this.buildFinanceOverview(this.props.balance, this.props.currency);
    }

    getIcon = (key) => {
        switch (key) {
            case 'membership': return <Membership />;
            case 'rent': return <Rent />;
            case 'event': return <Event />;
            case 'angel': return <Angel />;
        }
    }

    getValueWithSpace = (value) => {
        const sign = value >= 0 ? '+' : '-';
        const absValueStr = Math.abs(value).toString();
        const result = [];

        for (let i = 1; i <= absValueStr.length; i++) { // entry value ex.: '12319217'
            result.push(absValueStr.charAt(absValueStr.length - i));
            if (i % 3 === 0 && i !== absValueStr.length) result.push(' ');
        }
        // output: ['7', '1', '2', ' ', '9', '1', '3', ' ', '2', '1']
        return `${sign}${result.reverse().join('')} `;
    }

    buildFinanceOverview = (balance, currency) => {
        try {
            const categories = [];
            for (const [key, value] of Object.entries(balance)) {
                categories.push(
                    <div key = {key} className = 'fin-card'>
                        <div className='fin-card-1st'>
                            <div><span className = 'capitalize'>{key}</span> balance:</div>
                            <div>{this.getIcon(key)}</div>
                        </div>
                        <div className={`fin-card-2nd ${value >= 0 ? 'green' : 'red'}`}>
                            <div>{this.getValueWithSpace(value)}</div>
                            &nbsp;&nbsp;
                            <div>{currency}</div>
                        </div>
                    </div>
                );
            }
            this.setState({ balances: categories });
        } catch (error) {
            this.props.onError(error);
        }
    }

    render () {
        return (
            <div className='outer'>
                {this.state.balances}
            </div>
        );
    };
}

FinanceDashboard.propTypes = {
    balance: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired
};

export default FinanceDashboard;

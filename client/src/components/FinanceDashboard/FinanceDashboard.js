import React from 'react';
import './FinanceDashboard.scss';
import PropTypes from 'prop-types';

class FinanceDashboard extends React.Component {
    state = {
        balances: [],
        errorState: null
    }

    componentDidMount () {
        this.buildFinanceOverview(this.props.balance, this.props.currency);
    }

    buildFinanceOverview = (balance, currency) => {
        try {
            const categories = [];
            for (const [key, value] of Object.entries(balance)) {
                categories.push(
                    <div key = {key}>
                        {`Current balance of ${key} pocket: ${value} ${currency}`}
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
            <div className = "overview" >
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

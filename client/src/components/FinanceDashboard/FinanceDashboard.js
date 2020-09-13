import React from 'react';
import './FinanceDashboard.scss';
import PropTypes from 'prop-types';

class FinanceDashboard extends React.Component {
    state = {
        balances: [],
        errorState: null
    }

    componentDidMount () {
        this.buildFinanceOverview(this.props.financePockets, this.props.currency);
    }

    buildFinanceOverview = (financeData, currency) => {
        try {
            const categories = [];
            const pockets = Object.entries(financeData);
            for (const pocket of pockets) {
                categories.push(
                    <div key = {pocket[0]}>
                        {`Current balance of ${pocket[0]} pocket: ${pocket[1].currentBalance} ${currency}`}
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
    financePockets: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired
};

export default FinanceDashboard;
